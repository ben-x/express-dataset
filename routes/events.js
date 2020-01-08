var express = require('express');
var router = express.Router();

// Routes related to event
// Returning all the events
router.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

// Adding new events
router.post("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

// Returning the event records filtered by the actor ID
router.post("/actors/:id", (req, res, next) => {
  res.json({"message":"Ok"})
});

module.exports = router;