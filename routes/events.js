var express = require('express');
var router = express.Router();
const { addEvent, getAllEvents } = require('../controllers/events');

// Routes related to event
router.post('/events', addEvent);
router.get('/events', getAllEvents);

module.exports = router;