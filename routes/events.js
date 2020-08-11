var express = require('express');
var router = express.Router();
var { addEvent, getAllEvents, getByActor } = require('../controllers/events')


// Routes related to event
router.post("/", addEvent);
router.get("/", getAllEvents);
router.get("/actors/:actorID", getByActor);

module.exports = router;