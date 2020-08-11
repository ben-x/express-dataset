var express = require('express');
var router = express.Router();
var { addEvent } = require('../controllers/events')


// Routes related to event
router.post("/", addEvent);

module.exports = router;