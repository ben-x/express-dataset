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

// Update actor's avatar url
var updateActor = (req, res) => {
	const { id, login, avatar_url } = req.body;
	let updateError = false;
	const findActor = `SELECT * FROM actors WHERE id = ?`;
	const updateAvatar = `UPDATE actors SET avatar_url = ? WHERE id = ?`;

	const params = [avatar_url, id]

	db.serialize(() => {

		db.get(findActor,[params[1]], (err, rows) => {
			if (err) {
				updateError = true;
				return res.status(500).send({
					error: true,
					message: 'Network error, please try again later'
				});
			}
			
			// Check if actor exist
			if (rows === undefined) {
				updateError = true;
				return res.status(404).send({
					error: true,
					message: 'User not found',
				});
			}

			// Check if other fields are being updated by the user
			if (login !== rows.login) {
				updateError = true;
				return res.status(400).send({
					error: true,
					message: 'You can only update your avatar url',
				});
			}
		})
		
		// Update the avatar url
		db.run(updateAvatar, params, (err) => {
			if (updateError) {
				return
			}
			if (err) {
				return res.status(500).send({
					error: true,
					message: 'Network error, please try again later'
				});
			}
			return res.status(200).send({
				error: false,
				message: 'Profile successfully updated',
			});
		})
	})
};

var getStreak = (req, res) => {
	const query = `SELECT DISTINCT actors.id, actors.login, actors.avatar_url, COUNT() FROM actors INNER JOIN events ON events.actor_id = actors.id GROUP BY actors.id HAVING COUNT() >= 1 ORDER BY COUNT() DESC, events.created_at DESC, actors.login ASC`;
	db.serialize(() => {
		db.all(query, (err, rows) => {
			if (err) {
				console.log(err)
				return res.status(500).send({
					error: true,
					message: 'Network error, please try again later',
				});
			}
			return res.status(200).send({
				error: false,
				message: 'Actors streak',
				data: rows
			});
		})
	})
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















