var express = require("express");
var router = express.Router();
const { addEvent } = require("../controllers/events");
const { returnValidationErrors, validateEvent } = require("../middleware/validation");

// Routes related to event
router.post("/", validateEvent, returnValidationErrors, addEvent);

module.exports = router;
