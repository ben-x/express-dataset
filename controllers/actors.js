const db = require('../database/db-config');

const getAllActors = () => {};

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

const getStreak = () => {};

module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak,
};
