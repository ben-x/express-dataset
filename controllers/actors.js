
var db = require("../db_config")

var getAllActors = (req, res) => {
	db.find({}, { actor: 1, _id: 0 }).sort({ 'actor.login': 1 }).exec((err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			return res.status(200).send(result)
		}
	});

};

var updateActor = (req, res) => {
	const data = req.body
	db.update({ "actor.id": data.id }, { $addToSet: { "actor.avatar_url": data.avatar_url } }, { upsert: true }, (err, numActorsUpdated, updatedActor) => {
		if (err) throw new Error(err)
		if (numActorsUpdated === 0) {
			return res.status(404).send("unable to to update avatar")
		}
		return res.status(200).send("avatar updated")
	})
};

var getStreak = (req, res) => {
	db.find({}, { actor: 1, _id: 0 }).sort({ login: -1 }).exec((err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			return res.status(200).send(result)
		}
	});
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};