var express = require('express');
var Events = require('../controllers/events');
var Auth = require('../middleware/verifyToken');
var Validation = require('../validation/eventInputValidator');
var Actors = require('../middleware/checkActor');
var router = express.Router();

// Routes related to event
router.post('/', Validation.eventInputValidator, Auth.verifyToken, Events.addEvent)
router.get('/', Events.getAllEvents);
router.get('/actors/:id', Actors.checkActor, Events.getByActor);

module.exports = router;