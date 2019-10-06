var Datastore = require('nedb')
  , db = {};
  db.actors = new Datastore('database/actors.db');
  db.events = new Datastore('database/events.db');
  db.actors.loadDatabase();
  db.events.loadDatabase();

const actors = db.actors;
const events = db.events;

module.exports = {
    actors: actors,
    events: events
};
