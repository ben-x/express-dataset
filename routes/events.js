var express = require('express');
var router = express.Router();
var eventsController = require('./../controllers/events');

// Routes related to event
// Returning all the events
router.get('/', async (req, res, next) => {
	const events = await eventsController.getAllEvents();
	res.status(200).json(events);
});

// Adding new events
router.post('/', async (req, res, next) => {
	try {
		const response = await eventsController.addEvent(req.body);
		if (response.status) {
			return res.status(201).json({});
		} else {
			return res.status(400).json(response.data);
		}

	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// Returning the event records filtered by the actor ID
router.get('/actors/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		const response = await eventsController.getByActor(id);
		if (response.status) {
			return res.status(200).json(response.data);
		} else {
			return res.status(404).json(response.data);
		}
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

module.exports = router;
