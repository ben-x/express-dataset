var express = require('express');
var router = express.Router();
var eventsController = require('./../controllers/events');

// Route related to delete events
// Erasing all the events
router.delete("/", async (req, res, next) => {
	const response = await eventsController.eraseEvents();
	res.status(200).json({ success: true, msg: 'events deleted successfully', data: {}})
});
module.exports = router;