var db = require('../data-source/db')
var moment = require('moment');
var getAllActors = (req, res) => {
	try {
		var events = db('events.db');
		events.find({}, { _id: 0 }, function (err, docs) {
			res.status(200).send(groupByOccurence(docs))
		});
	} catch (error) {
		res.status(500).send({ error })
	}
};

var groupByOccurence = (obj) => {
	const res = Array.from(
		obj.reduce((map, item) =>
			(map.get(item.actor.id).count++, map)
			, new Map(obj.map(o =>
				[o.actor.id, Object.assign({}, o, { count: 0 })]
			))), ([k, o]) => o
	).sort((a, b) => (b.count - a.count || new Date(b.created_at) - new Date(a.created_at)) || a.actor.login.toLowerCase().localeCompare(b.actor.login.toLowerCase()))
		.map(o => o.actor);
	return res;
}

var updateActor = (req, res) => {
	try {
		let body = req.body
		var events = db('events.db');
		events.find({
			"actor.id": parseInt(BigInt(body.id))
		}, function (error, docs) {
			if (error) {
				return res.status(500).send(error);
			}
			if (docs.length == 0)
				return res.status(404).send()

			// if (Object.keys(body).length >= 2 && Object.keys(body).includes('login')) {
			// 	return res.status(400).send()
			// }
			events.update({ "actor.id": parseInt(BigInt(body.id)) }, { $set: { "actor.avatar_url": body.avatar_url } }, { multi: true }, function (err, numReplaced) {
				if (err) {
					res.status(500).send({ error })
				}
				res.status(200).send({})
			});
		});
	} catch (error) {
		res.status(500).send({ error })
	}


};

var getStreak = (req, res) => {
	try {
		var events = db('events.db');
		events.find({}, { _id: 0 }, function (err, docs) {
			let temp = groupByStreaksDate(docs)
			let a = calculateStreaks(temp)
			r = a.sort((a, b) => parseInt(b.ss) - parseInt(a.ss) || new Date(b.streaks[b.streaks.length - 1]) - new Date(a.streaks[a.streaks.length - 1]) || a.actor.login.toLowerCase().localeCompare(b.actor.login.toLowerCase()))
			let main = []
			r.map(a => {
				main.push(a.actor)
			})
			res.status(200).send(main)
		});
	} catch (error) {
		res.status(500).send({ error })
	}
};

var groupByStreaksDate = (obj) => {
	const res = Array.from(
		obj.reduce((map, item) =>
			(map.get(item.actor.id).streaks.push(item.created_at), map)
			, new Map(obj.map(o =>
				[o.actor.id, Object.assign({}, o, { streaks: [] })]
			))), ([k, o]) => o
	).sort((a, b) => (b.streaks.length - a.streaks.length))
		.map(o => o);
	let arr = []
	res.map(o => {
		o.streaks.sort((a, b) => new Date(b) - new Date(a))
		arr.push(o)
	})
	return arr;
}

var calculateStreaks = (docs) => {
	docs.forEach(e => {
		e.ss = docalculate(e, e)

	});
	return docs
}

var docalculate = (el, el1) => {
	let count = 0;
	let i = 1;
	el.streaks.forEach(q => {
		if (moment(q).startOf('day').diff(moment(el1.streaks[i]).startOf('day') || q, 'days') == 1) {

			count++
		}
		i++
	})
	return count;
}





module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















