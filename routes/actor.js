const express = require('express');
const router = express.Router();

const {
	getAllActors,
	updateActor,
	getStreak,
} = require('../controllers/actors');

// Routes related to actor.
router.route('/').put(updateActor);

module.exports = router;
