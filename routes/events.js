var express = require('express');
var router = express.Router();
var eventController = require('../controllers/events')
// Routes related to event

router.get('/', eventController.getAllEvents)
router.post('/', eventController.addEvent)


module.exports = router;