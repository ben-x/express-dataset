const sqlite3 = require('sqlite3').verbose();
const event = require('../model/event.model');
const actor = require('../model/actor.model');
const repo = require('../model/repo.model');

let db = new sqlite3.Database(':memory:', (err)=>{
    if (err){
        return console.log(err.message)
    }
    db.serialize(()=>{
        db.run(event.createEventTable);
        db.run(actor.createActorTable);
        db.run(repo.createRepoTable);
    })

    console.log('DB connection successful');
})

module.exports = db;