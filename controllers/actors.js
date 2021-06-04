var db = require('../data-source/db')
var getAllActors = (req, res) => {
	let test = [];
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
	const result = Array.from(
		obj.reduce((map, item) =>
			(map.get(item.actor.id).count++, map)
			, new Map(obj.map(o =>
				[o.actor.id, Object.assign({}, o, { count: 0 })]
			))), ([k, o]) => o
	).sort((a, b) => b.count - a.count)
		.map(o => o.actor);
	return result;
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
	res.status(200).send({})
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















