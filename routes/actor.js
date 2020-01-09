var express = require('express');
var router = express.Router();
var actorsController = require('./../controllers/actors')

// Routes related to actor.
// Updating the avatar URL of the actor
router.put("/", async (req, res, next) => {
  const {id, login, avatar_url} = req.body;
  try {
    const response = await actorsController.updateActor(id, login, avatar_url)
		if (response.status) {
      return res.status(200).json({});
		} else {
			return res.status(404).json(response.data);
		}
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
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