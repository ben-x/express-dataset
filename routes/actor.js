var express = require("express");
var { returnValidationErrors, validateActor } = require("../middleware/validation");
var router = express.Router();
const { addActor } = require("../controllers/actors");

// Routes related to actor.

module.exports = router;
