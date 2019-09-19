var express = require('express');
var eventController = require('../controllers/events');
var router = express.Router();

// Routes related to event
router.get('/events', function(req, res, next) {
  res.render('events', eventController.getAllEvents);
});
router.post('/events', function(req, res, next) {
  res.render('events', eventController.addEvent);
});


module.exports = router;
