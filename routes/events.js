const express = require('express');
const router = express.Router();

const {getAllEvents,addEvent, getByActor} = require('../controllers/events')
// Routes related to event

router.post("/", addEvent);
router.get("/", getAllEvents);
router.get("/actors/:actorID", getByActor);

module.exports = router;