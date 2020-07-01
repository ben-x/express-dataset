const express = require("express");
const router = express.Router();
const {
  updateActor,
  getAllActors,
  getStreak,
} = require("../controllers/actors");

// Routes related to actor.
router.put("/", updateActor);

router.get("/", getAllActors);

router.get("/streak", getStreak);

module.exports = router;
