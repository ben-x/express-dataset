var db = require('../models/dbConnection');

var getAllEvents = (req, res) => {
	try {
		db.find({})
			.sort({ _id: 1 })
			.exec(function (err, docs) {
				if (err) return res.status(400).json({ success: false, message: err.message })
				docs.forEach((doc) => { delete doc._id })
				return res.status(200).json(docs)
			});
	} catch (err) {
		return res.status(401).send(err.message)
	}
};

var addEvent = (req, res) => {
	try {
		db.findOne({ id: req.body.id }, (_, doc) => {
			if (doc != null) {
				return res.status(400).json({ success: false, message: 'Duplicate' });
			}
			db.insert(req.body, (err, doc) => {
				return res.status(201).json({
					id: doc.id,
					type: doc.type,
					actor: doc.actor,
					repo: doc.repo,
					created_at: doc.created_at
				})
			});
		})
	} catch (err) {
		return res.status(401).send(err.message)
	}
};


var getByActor = (req, res) => {
	try {
		const { actorID } = req.params
		db.find({ "actor.id": Number(actorID) })
			.sort({ _id: 1 })
			.exec(function (err, docs) {
				if (err) return res.status(400).json({ success: false, message: err.message })
				if (docs.length < 1) {
					return res.status(404).json({ success: false, message: 'Event not find' })
				}
				docs.forEach((doc) => { delete doc._id })
				return res.status(200).json(docs)

			})
	} catch (err) {
		return res.status(401).send(err.message)
	}
};


var eraseEvents = (req, res) => {
	try {
		db.remove({}, { multi: true }, function (err, numRemoved) {
			if (err) return res.status(400).json({ success: false, message: err.message })
			return res.status(200).json({ success: true, message: `deleted ${numRemoved} successfully` })
		});
	} catch (err) {
		return res.status(401).send(err.message)
	}
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















