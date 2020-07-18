const Datastore = require('nedb-promises');

const db = Datastore.create({
  filename: 'db/datafile.db',
  autoload: true,
});

module.exports = db;
