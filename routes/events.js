var express = require('express');
var router = express.Router();
var eventController = require('../controllers/events')
// Routes related to event

router.get('/', eventController.getAllEvents)
router.post('/', eventController.addEvent)
router.get('/actors/:actorID', eventController.getByActor)


module.exports = router;