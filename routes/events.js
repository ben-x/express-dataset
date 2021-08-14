var express = require('express');
var controller = require("../controllers/events")

var router = express.Router();

// Routes related to event

router.get("/", controller.getAllEvents)
router.post("/", controller.addEvent)
router.get("/actors/:actorID", controller.getByActor)

module.exports = router;