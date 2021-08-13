var express = require('express');
var controller = require("../controllers/actors")

var router = express.Router();

// Routes related to actor.

router.put("/", controller.updateActor)
router.get("/", controller.getAllActors)
router.get("/streak", controller.getStreak)

module.exports = router;