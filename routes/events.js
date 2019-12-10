const express = require('express');
const router = express.Router();
const {addEvent, getAllEvents, getByActor} = require('../controllers/events');

// Routes related to event
router.post('/', addEvent)
router.get('/', getAllEvents)
router.get('/actors/{actorID}', getByActor)


module.exports = router;