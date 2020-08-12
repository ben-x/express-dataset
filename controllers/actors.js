var db = require('../models/dbConnection');

var getAllActors = (req, res) => {
	try {
		db.find({}, { _id: 0, type: 0, repo: 0, created_at: 0, id: 0 })
			.exec((err, doc) => {
				let result = []
				//console.log(doc[0])
				doc.forEach((actor) => {
					result.push(actor.actor)
				})
				let d = []
				result.forEach((k) => {
					if (d.length < 1) {
						k.count = 1
						d.push(k)
					} else {
						d.forEach((l) => {
							if (l.id === k.id) {
								l.count += 1
							} else {
								d.push(k)
							}
						})
					}
				})
				console.log(d)

				db.count({ "actor.id": { $in: result } }, (_, doc) => {
					console.log(doc + 'kola')
				})
				//console.log(result)
				return res.send(result)
			})
			;
	} catch (err) {
		return res.status(401).send(err.message)
	}

};

var updateActor = () => {

};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















