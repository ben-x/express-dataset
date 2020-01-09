var express = require('express');
var router = express.Router();
var eventsController = require('./../controllers/events');

// Routes related to event
// Returning all the events
router.get('/', async (req, res, next) => {
  const events = await eventsController.getAllEvents();  
	res.status(200).json({ success: true, data: events})
});

// Adding new events
router.post('/', async (req, res, next) => {
	try {
		const event = await eventsController.addEvent(req.body);
		return res.status(201).json({ success: true, data: event });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// Returning the event records filtered by the actor ID
router.get('/actors/:id', async (req, res, next) => {
	const id = req.params.id;	
	const events = await eventsController.getByActor(id);
	res.status(200).json({ success: true, data: events})
 
});

module.exports = router;
