const sqlite3 = require('sqlite3').verbose();
const eventQueries = require('./events')
const actorQueries = require('./actor')
const repoQueries = require('./repo')

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    db.serialize(() => {
        db.run(eventQueries.createEventTable)
        db.run(actorQueries.createActorTable)
        db.run(repoQueries.createRepoTable)
    });
    console.log('Connected to the in-memory SQlite database.');
});

module.exports = db;