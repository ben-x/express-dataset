var Datastore = require('nedb');

var event = new Datastore({ filename: './models/eventDb', autoload: true });

module.exports = event
