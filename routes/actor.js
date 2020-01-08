const express = require('express');
const router = express.Router();
const {
  getAllActors,
  updateActor,
  getStreak } = require('../controllers/actors');

// Routes related to actor.
router.get('/actors', getAllActors);
router.put('/actors', updateActor);
router.get('/actors/streak', getStreak);

module.exports = router;
