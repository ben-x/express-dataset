var express = require('express');
var router = express.Router();
var {getAllActors, updateActor, getStreak} = require('../controllers/actors');

// Routes related to actor.
router.get('/', getAllActors);
router.put('/actors', updateActor);
router.get('/actors/streak', getStreak);

module.exports = router;
