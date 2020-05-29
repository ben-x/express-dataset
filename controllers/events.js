const db = require('../database/db-config');

const getAllEvents = (req, res, next) => {
	db.find({})
		.sort({ id: 1 })
		.exec((err, docs) => {
			if (err) {
				next(err);
			}

			res.status(200).json({
				docs,
			});
		});
};

const addEvent = (req, res, next) => {
	db.findOne({ id: req.body.id }, (err, doc) => {
		if (doc !== null) {
			res.status(400).json({
				status: 'failed',
				message: 'Event already exists!',
			});
		} else {
			db.insert(req.body, (err, newDoc) => {
				if (err) {
					next(err);
				}

				res.status(201).json({
					status: 'success',
					newDoc,
				});
			});
		}
	});
};

const getByActor = (req, res) => {
	const { id } = req.params;

	db.find({ 'actor.id': parseInt(id) })
		.sort({ id: 1 })
		.exec((err, docs) => {
			if (err) {
				res.status(500).end();
			}

			if (docs.length === 0) {
				res.status(404).json({
					message: 'No such actor found.'
				});
			} else {
				res.status(200).json({
					docs,
				});
			}
		});
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
};
