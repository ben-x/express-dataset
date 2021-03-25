const actorQuery =require('../model/actor.model');
const db = require('../db/db.config')

const getAllActors = (req,res) => {
	try {
		db.all(actorQuery.getAllActors, (err, actors) => {
			if (err) {
				return res.status(400).json({ message: err.message });
			}

			const obj = actors.map((actor) => {
				return {
					id: actor.id,
					login: actor.login,
					avatar_url: actor.avatar_url,
				}
			})
			return res.status(200).json(obj)
		})
		;
	} catch (err) {
		return res.status(400).send(err.message)
	}
};

const updateActor = (req,res) => {
	try {
		const { id, avatar_url } = req.body
		db.run(actorQuery.updateActor, [avatar_url, id], (err) => {
			if (err) {
				return res.status(404).json({ message: err.message });
			}
			return res.status(200).json({ message: 'updated!!' })
		})
		;
	} catch (err) {
		return res.status(400).send(err.message)
	}
};

const getStreak = (req,res) => {
	try {
		db.all(actorQuery.getActorsStreak, (err, actors) => {
			if (err) {
				return res.status(400).json({ message: err.message });
			}

			const obj = actors.map((actor) => {
				return {
					id: actor.iD,
					login: actor.login,
					avatar_url: actor.avatar_url,

				}
			})
			return res.status(200).json(obj)
		});
	} catch (err) {
		return res.status(400).send(err.message)
	}
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















