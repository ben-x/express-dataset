var express = require('express');
var controller = require("../controllers/events")

var router = express.Router();

// Route related to delete events

router.delete("/", controller.eraseEvents)

module.exports = router;

