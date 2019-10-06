const Models = require('../database/database');

const updateEventCount = (actorId) => {
    Models.actors.findOne({ _id: actorId }, (err, actor) => {
      Models.actors.update({ _id: actorId }, { $set: { events: actor.events + 1 } }, { multi: true }, function (err) {
        return true;
      });
      });
}

module.exports = {
    updateEventCount: updateEventCount
}