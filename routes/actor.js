const express = require('express');
const router = express.Router();

const {
	getAllActors,
	updateActor,
	getStreak,
} = require('../controllers/actors');

// Routes related to actor.
router.route('/').put(updateActor).get(getAllActors);

router.route('/streak').get(getStreak);

module.exports = router;
