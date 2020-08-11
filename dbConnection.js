var Datastore = require('nedb');

var db = new Datastore({ filename: './eventDb', autoload: true });

module.exports = db