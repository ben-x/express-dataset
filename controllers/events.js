const db = require('../models/dbConnection');
const eventQuery = require('../models/events');
const actorQuery = require('../models/actor')
const repoQuery = require('../models/repo')

var getAllEvents = (req, res) => {
	try {

		db.all(eventQuery.getAllEvents, (err, events) => {
			if (err) {
				return res.status(400).json({ error: err.message });
			}
			const obj = events.map((res) => {
				return {
					id: res.id,
					type: res.type,
					actor: {
						id: res.actorId,
						login: res.login,
						avatar_url: res.avatar_url,
					},
					repo: {
						id: res.repoId,
						name: res.name,
						url: res.url,
					},
					created_at: res.created_at,
				}
			})
			return res.status(200).json(obj);
		})

	} catch (err) {
		return res.status(401).send(err.message)
	}
};

var addEvent = (req, res) => {
	const { repo, actor, ...rest } = req.body;
	try {
		db.serialize(() => {
			db.all(
				"SELECT * FROM actors WHERE actors.id = $1",
				actor.id,
				(err, result) => {
					if (!err && result.length === 0) {
						db.run(actorQuery.createActor, Object.values(actor));
					}
				}
			);

			db.all(
				"SELECT * FROM repos WHERE repos.id = $1",
				repo.id,
				(err, result) => {
					if (!err && result.length < 1) {
						db.run(repoQuery.createRepo, Object.values(repo));
					}
				}
			);

			db.all(
				"SELECT * FROM events WHERE events.id = $1",
				req.body.id,
				(err, result) => {
					if (err) return res.status(400).json({ success: false, message: err.message })
					if (result.length > 0) {
						return res.status(400).json({ success: false, message: "Duplicated Event" });
					} else {
						db.run(
							eventQuery.createEventQuery,
							Object.values({
								id: rest.id,
								type: rest.type,
								actorId: actor.id,
								repoId: repo.id,
								created_at: rest.created_at,
							}), (err) => {
								if (err) {
									console.log(err)
								}
								return res.status(201).json(req.body);
							}
						);
					}
				}
			);
		})
	} catch (err) {
		return res.status(401).send(err.message)
	}
};


var getByActor = (req, res) => {
	try {
		const { actorID } = req.params
		db.find({ "actor.id": Number(actorID) }, { _id: 0 })
			.sort({ _id: 1 })
			.exec(function (err, docs) {
				if (err) return res.status(400).json({ success: false, message: err.message })
				if (docs.length < 1) {
					return res.status(404).json({ success: false, message: 'Event not found' })
				}
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

















