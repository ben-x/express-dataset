var express = require('express');
var Events = require('../controllers/events');
var Auth = require('../middleware/verifyToken')
var Validation = require('../validation/eventInputValidator');
var router = express.Router();

// Routes related to event
router.post('/', Validation.eventInputValidator, Auth.verifyToken, Events.addEvent)

module.exports = router;