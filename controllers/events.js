var db = require('../data-source/db')
var getAllEvents = (req, res) => {
	try {
		var events = db('events.db');
		events.find({}, { _id: 0 }).sort({ id: 1 }).exec(function (error, docs) {
			if (error) {

				return res.status(500).send(error);
			}
			res.status(200).send(docs)
		});
	} catch (error) {
		res.status(500).send({ error })
	}

};

var addEvent = (req, res) => {
	try {
		let body = req.body
		let eventObject = {
			id: body.id,
			type: body.type,
			actor: {
				id: body.actor.id,
				login: body.actor.login,
				avatar_url: body.actor.avatar_url
			},
			repo: {
				id: body.repo.id,
				name: body.repo.name,
				url: body.repo.url
			},
			created_at: body.created_at
		}
		var events = db('events.db');
		events.insert(eventObject, (error, newDoc) => {
			if (error) {
				if (error.message.includes("it violates the unique constraint")) {
					return res.status(400).send(error);
				}
			}
			return res.status(201).send(newDoc);
		});
	} catch (error) {
		res.status(500).send({ error })
	}
};


var getByActor = (req, res) => {
	try {
		let actor_id = req.params.actorID;
		var events = db('events.db');
		events.find({
			"actor.id": parseInt(actor_id)
		}, { _id: 0 }).sort({ _id: 1 }).exec(function (error, docs) {
			if (error) {
				return res.status(500).send(error);
			}
			if (docs.length == 0)
				return res.status(404).send(docs)
			return res.status(200).send(docs)
		});
	} catch (error) {
		res.status(500).send({ error })
	}

};


var eraseEvents = (req, res) => {
	var events = db('events.db');
	events.remove({}, { multi: true }, function (error, numRemoved) {
		if (error) {
			return res.status(500).send({ status: 500 });
		}
		return res.status(200).send({ status: 200 });
	});
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















