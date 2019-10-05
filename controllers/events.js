const db = require("../models");

const { Event, Actor, Repo } = db;
const options = {
  attributes: { exclude: ["actorId", "repoId"] },
  include: [{ model: Actor, as: "actor", attributes: { exclude: ["createdAt", "updatedAt"] } }, { model: Repo, as: "repo", attributes: { exclude: ["createdAt", "updatedAt"]} }]
};

var getAllEvents = async () => {};

var addEvent = (req, res) => {
  const { type, actor, repo } = req.body;
  Actor.findCreateFind({where: {...actor}}).spread(async(actorRes) => {

    try {
    const eventRes = await Event.create(
      {
        type,
        actorId: actorRes.dataValues.id,
        repo
      },
      { include: [{ model: Repo, as: "repo" }]}
    );

    const event = await Event.findByPk(eventRes.id, options);
    return res.status(201).json({
      message: "Event created successfully",
      event
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
    
  
  })
};

var getByActor = () => {};

var eraseEvents = () => {};

module.exports = {
  getAllEvents,
  addEvent,
  getByActor,
  eraseEvents
};
