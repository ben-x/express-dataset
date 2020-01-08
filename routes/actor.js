var express = require('express');
var router = express.Router();
const { getAllActors, updateActor } = require('../controllers/actors');

// Routes related to actor.
router.get('/actors', getAllActors);
router.put('/actors', updateActor);

module.exports = router;