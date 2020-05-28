const Datastore = require('nedb');
const db = new Datastore({
	filename: './datafile.db',
	autoload: true
});

module.exports = db;
