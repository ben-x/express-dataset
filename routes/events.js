var express = require('express');
var router = express.Router();
const { addEvent } = require('../controllers/events');

// Routes related to event
router.post('/events', addEvent)

module.exports = router;