const db = require('../database/db-config');

const eraseEvents = (req, res, next) => {
	db.remove({}, { multi: true }, (err, numRemoved) => {
		if (err) {
			next(err);
		}

		res.status(200).json({
			numRemoved,
		});
	});
};

module.exports = { eraseEvents: eraseEvents };
