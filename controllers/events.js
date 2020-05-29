const db = require('../database/index');

var getAllEvents = (_req, res) => {
	const query = `SELECT *, events.id FROM events LEFT JOIN actors ON actors.id = events.actor_id LEFT JOIN repos ON repos.id = events.repo_id ORDER BY events.id ASC`;
	db.all(query, (err, rows)=>{
		if (err) {
			return res.status(500).json({
				message: 'An Error Occured',
			});
		}
		return res.status(200).json({
			message: 'Events retrieved successfully',
			rows
		});
	});
};

var addEvent = (req, res) => {
	const {type, actor_id, repo_id} = req.body;
	const event  = `SELECT * FROM events WHERE id =:id`;
	const query = `INSERT INTO events (type, actor_id, repo_id) VALUES (?,?,?)`;

	if(!type || !actor_id || !repo_id) {
		return res.status(400).json({
			message: 'Fields are required'
		})
	}

	db.serialize(()=>{
		db.run(query, [type, actor_id, repo_id], (err) => {
			if (err) {
				return res.status(500).json({
					message: 'An Error Occured'
				});
			}
			return res.status(201).json({
				message: 'Event created successfully'
			})
		});
	})
};


var getByActor = (req, res) => {
	const {id} = req.params;
	const query = `SELECT * FROM events WHERE actor_id =:id ORDER BY events.id ASC`;

	db.all(query, id, (err, rows) => {
		if (err) {
			return res.status(500).json({
				message: 'An Error Occured'
			});
		}

		if (rows.length === 0) {
			return res.status(404).json({
				message: 'Events not found'
			})
		}
		return res.status(200).json({
			message: 'Events retrieved successfully',
			rows
		})
	})
};


var eraseEvents = (_req, res) => {
	const query = `DELETE FROM events`;
	db.run(query, (err) => {
		if (err) {
			return res.status(500).json({
				message: 'An Error Occured '
			});
		}

		return res.status(200).json({
			message: 'Events successfully erased'
		});
	});
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};
