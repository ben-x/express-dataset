var db = require("../db_config")

var getAllEvents = (req, res) => {
	db.find({}).sort({ id: 1 }).exec((err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			return res.status(200).send(result)
		}
	});
};

var addEvent = async (req, res) => {
	var data = req.body
	db.find({ id: data.id }).exec((err, result) => {
		if (result !== null) {
			return res.status(400).json({
				status: "duplicate",
				message: "Events already exist."
			})
		} else {
			db.insert(data).exec((err, added) => {
				if (err) {
					throw new Error(err)
				} else {
					return res.status(201).json({
						status: 'success',
						added,
					})
				}
			})

		}
	});
};

var getByActor = (req, res) => {
	var { actorID } = req.params
	db.find({ "actor": { $elemMatch: { id: actorID } } }).sort({ id: -1 }).exec((err, result) => {
		if (err) {
			throw new Error(err)
		} else {
			return res.status(200).send()
		}
	});
};


var eraseEvents = (req, res) => {
	db.remove({}, { multi: true }, function (err, numRemoved) {
		if (err) {
			console.error(err);
		} else {
			return res.status(200).send()
		}
	});
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};