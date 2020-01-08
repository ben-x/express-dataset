var express = require('express');
var router = express.Router();
const { getAllActors } = require('../controllers/actors');

// Routes related to actor.
router.get('/actors', getAllActors);


module.exports = router;