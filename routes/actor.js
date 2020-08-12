var express = require('express');
var router = express.Router();
var { getAllActors } = require('../controllers/actors')

// Routes related to actor.
router.get('/', getAllActors)

module.exports = router;