var Datastore = require('nedb')
  , db = {};
  db.actors = new Datastore('database/actors.db');
  db.actors.loadDatabase();

const actors = db.actors;
module.exports = {
    actors: actors
};
