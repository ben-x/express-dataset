const express = require('express');
const router = express.Router();
const controller = require('../controllers/events');

// Routes related to event
router.post('/', controller.addEvent)
router.get('/', controller.getAllEvents)
router.get('/actors/{actorID}', controller.getByActor)


module.exports = router;
