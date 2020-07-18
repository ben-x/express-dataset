var Datastore = require('nedb');
var db = new Datastore({
  filename: 'db/datafile.db',
  autoload: true,
});

module.exports = db;
