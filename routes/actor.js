var express = require('express');
import { updateActor, getAllActors, getStreak } from '../controllers/actors';

var router = express.Router();

// Routes related to actor.
router.put('/:id', updateActor);
router.get('/', getAllActors);
router.get('/streak', getStreak);

module.exports = router;
