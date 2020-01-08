var express = require('express');
var router = express.Router();
const {
  addEvent,
  getAllEvents,
  getByActor,
  eraseEvents } = require('../controllers/events');

// Routes related to event
router.post('/events', addEvent);
router.get('/events', getAllEvents);
router.get('/events/actors/:id', getByActor);
router.delete('/events', eraseEvents);

module.exports = router;