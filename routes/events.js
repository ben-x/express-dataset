var express = require('express');
var router = express.Router();
var {addEvent, getAllEvents, getByActor} = require('../controllers/events');
// Routes related to event
router.post('/events', addEvent);
router.get('/', getAllEvents);
router.get('/events/actors/:id', getByActor)

module.exports = router;
