const db = require('../db/index');

var getAllEvents = (req, res) => {
	const getEventsQuery = `SELECT *, events.id FROM events LEFT JOIN actors ON actors.id = events.actor_id LEFT JOIN repos ON repos.id = events.repo_id ORDER BY events.id ASC`
	db.all(getEventsQuery, (err, rows) => {
		if (err) {
			return res.status(500).send({
				error: true,
				message: 'Network error, please try again later'
			});
		}
		return res.status(200).send({
			error: false,
			message: 'All events',
			data: rows
		})
	})
};

var addEvent = (req, res) => {
	const { type, actor_id, repo_id } = req.body;

	if (!type || !actor_id || !repo_id) {
		return res.status(400).send({
			error: true,
			message: 'type, actor ID, and repo ID are required'
		});
	}
	const insertQuery = `INSERT INTO events (type, actor_id, repo_id) VALUES (?,?,?)`;

	db.serialize(() => {
		db.run(insertQuery, [type, actor_id, repo_id], (err) => {
			if (err) {
				return res.status(500).send({
					error: true,
					message: 'Network error, please try again later'
				});
			}
			return res.status(201).send({
				error: false,
				message: 'Event created successfully'
			})
		});
	})
};


var getByActor = (req, res) => {
	const { id } = req.params;

	const actorEventsQuery = `SELECT * FROM events WHERE actor_id = ? ORDER BY events.id ASC`;

	db.all(actorEventsQuery, [parseInt(id, 10)], (err, rows) => {
		if (err) {
			return res.status(500).send({
				error: true,
				message: 'Network error, please try again later'
			});
		}

		if (rows.length === 0) {
			return res.status(404).send({
				error: true,
				message: 'Events not found'
			})
		}
		return res.status(200).send({
			error: false,
			message: 'Actor\'s events',
			data: rows
		})
	})
};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















