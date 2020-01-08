var express = require('express');
var router = express.Router();

// Routes related to actor.
// Updating the avatar URL of the actor
router.put("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

// Returning the actor records ordered by the total number of events
router.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

// Returning the actor records ordered by the maximum streak
router.get("/streak", (req, res, next) => {
  res.json({"message":"Ok"})
});

module.exports = router;