var neDB = require('nedb');

var db = new neDB({ filename: 'events.db', autoload: true, timestampData: true, });


module.exports = db