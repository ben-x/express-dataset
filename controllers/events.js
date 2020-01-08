const db = require('../db/index');

var getAllEvents = () => {

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


var getByActor = () => {

};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















