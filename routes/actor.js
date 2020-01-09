var express = require('express');
var router = express.Router();
var actorsController = require('./../controllers/actors')

// Routes related to actor.
// Updating the avatar URL of the actor
router.put("/", async (req, res, next) => {
  const {id, login, avatar_url} = req.body;
  const response = await actorsController.updateActor(id, login, avatar_url)
  res.status(200).json({})
});

// Returning the actor records ordered by the total number of events
router.get("/", async (req, res, next) => {
  const actors = await actorsController.getAllActors();  
	res.status(200).json(actors)
});

// Returning the actor records ordered by the maximum streak
router.get("/streak", (req, res, next) => {
  res.json({"message":"Ok"})
});

module.exports = router;