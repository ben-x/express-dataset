const express = require('express');
const router = express.Router();
const {
  addEvent,
  getAllEvents,
  getByActor } = require('../controllers/events');

// Routes related to event
router.post('/events', addEvent);
router.get('/events', getAllEvents);
router.get('/events/actors/:id', getByActor);

module.exports = router;