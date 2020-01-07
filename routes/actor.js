var express = require('express');
var router = express.Router();
const controller = require('../controllers/actors');

// Routes related to actor.
router.put('/', controller.updateActor);
router.get('/', controller.getAllActors);
router.get('/streak', controller.getStreak);

module.exports = router;
