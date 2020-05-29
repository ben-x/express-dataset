const db = require('../database/db-config');
const { getActors } = require('../utils/getActors');

/**
 * Get all actors controller
 *
 * @param {request} req
 * @param {response} res
 */
const getAllActors = (req, res) => {
	let result;

	db.find({})
		.sort({ actor: -1, created_at: -1, 'actor.login': 1 })
		.exec((err, docs) => {
			if (err) {
				res.status(500).end();
			}

			result = [...new Set(getActors(docs))];

			res.status(200).json({
				result,
			});
		});
};

/**
 * Updates an actor avatar url
 *
 * @param {request} req
 * @param {response} res
 */
const updateActor = (req, res) => {
	if (Object.entries(req.body).length > 3) {
		res.status(400).end();
	} else {
		const { id, avatar_url } = req.body;

		db.findOne({ 'actor.id': id }, (err, doc) => {
			if (err) {
				throw new Error(err);
			}

			if (doc === null) {
				res.status(404).json({
					message: 'Actor not found',
				});
			} else {
				doc.actor.avatar_url = avatar_url;

				res.status(200).json({
					doc: doc.actor,
				});
			}
		});
	}
};

const getStreak = (req, res) => {
	let actors;

	db.find({})
		.sort({ created_at: -1 })
		.exec((err, docs) => {
			if (err) {
				throw new Error(err);
			}

			actors = [...new Set(getActors(docs))];

			res.status(200).json({
				actors,
			});
		});
};

module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak,
};
