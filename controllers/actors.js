const db = require('../db/index');

// get all actors from the database
var getAllActors = (req, res) => {
	const query = `SELECT * FROM actors`;
	db.serialize(() => {
		db.all(query, (err, rows) => {
			if (err) {
				return res.status(500).send({
					error: true,
					message: 'Network error, please try again later',
				});
			}
			return res.status(200).send({
				error: false,
				message: 'Actors',
				data: rows
			});
		})
	})
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

















