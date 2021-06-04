var db = require('../data-source/db')
var getAllEvents = (req, res) => {
	var events = db('events.db');
	events.find({}).sort({ _id: 1 }).exec(function (error, docs) {
		if (error) {

			return res.status(500).send({ status: 500 });
		}
		res.status(200).send(docs)
	});

};

var addEvent = (req, res) => {
	let body = req.body
	let eventObject = {
		_id: body.id,
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
				return res.status(400).send({ status: 400 });
			}
		}
		return res.status(201).send({ status: 201 });
	});
};


var getByActor = () => {

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

















