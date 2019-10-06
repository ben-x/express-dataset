const express = require('express');
const Events = require('../controllers/events');
const Auth = require('../middleware/verifyToken');
const Validation = require('../validation/eventInputValidator');
const Actors = require('../middleware/checkActor');
const router = express.Router();

// Routes related to event
router.post('/', Validation.eventInputValidator, Auth.verifyToken, Events.addEvent)
router.get('/', Events.getAllEvents);
router.get('/actors/:id', Actors.checkActor, Events.getByActor);

module.exports = router;