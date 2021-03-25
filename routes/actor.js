const express = require('express');
const router = express.Router();
const { getAllActors, updateActor, getStreak } = require('../controllers/actors')

// Routes related to actor.

router.get('/', getAllActors)
router.put('/', updateActor)
router.get('/streak', getStreak)

module.exports = router;