const db = require('../database/index');

//Returning the actor records ordered by the total number of events
var getAllActors = (_req, res) => {
	const query = `SELECT DISTINCT actors.id, actors.login, actors.avatar_url, COUNT() FROM actors INNER JOIN events ON events.actor_id = actors.id GROUP BY actors.id HAVING COUNT() >= 1 ORDER BY COUNT() DESC, events.created_at DESC, actors.login ASC`;
	db.all(query, (err, rows) => {
		if (err) {
			return res.status(500).json({
				message: 'An Error Occured',
			});
		}
		return res.status(200).json({
			message: 'Actors retrieved successfully',
			rows
		});
	})
};

//Updating the avatar URL of the actor
var updateActor = (req, res) => {
	const { id, login, avatar_url } = req.body;
	const actor  = `SELECT * FROM actors WHERE id =:id`;
	const updateAvatar = `UPDATE actors SET avatar_url =:avatar_url WHERE id =:id`;

	db.serialize(() => {
		db.get(actor, id, (err, rows) => {
			if (err) {
				return res.status(500).json({
					message: 'An Error Occured'
				});
			}
			
			// Check if actor exists
			if (!rows) {
				return res.status(404).json({
					message: 'Actor not found',
				});
			}

			// Check if there are other fields being updated for the actor
			if (login !== rows.login) {
				return res.status(400).json({
					message: 'Unable to update login info',
				});
			}
		})
		
		// Update the avatar url
		db.run(updateAvatar, [id, avatar_url], (err) => {
			if (err) {
				return res.status(500).json({
					message: 'An Error Occured'
				});
			}
			return res.status(200).json({
				message: 'Actor Update successful',
			});
		})
	})
};

var getStreak = (req, res) => {
	const query = `SELECT DISTINCT actors.id, actors.login, actors.avatar_url, COUNT() FROM actors INNER JOIN events ON events.actor_id = actors.id GROUP BY actors.id HAVING COUNT() >= 1 ORDER BY COUNT() DESC, events.created_at DESC, actors.login ASC`;
	db.serialize(() => {
		db.all(query, (err, rows) => {
			if (err) {
				return res.status(500).json({
					message: 'An Error Occured',
				});
			}
			return res.status(200).json({
				message: 'Actors streak retrieved successfully',
				rows
			});
		})
	})
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};
