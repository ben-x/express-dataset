const sqlite3 = require('sqlite3').verbose();

export let db = new sqlite3.Database('./event.db', (err)=>{
    //open database
    if (err){
        return console.error(err.message);

    }
    console.log('Connected to the in-memory SQlite database')
});

db.run(`CREATE TABLE [IF NOT EXISTS] events (id INTEGER UNIQUE NOT NULL, type TEXT NOT NULL, 
    actorID INTEGER NOT NULL, login NVARCHAR NUT NULL, avatar_url NVARCHAR NOT NULL, repoID INTEGER NOT NULL,
     name TEXT NOT NULL, url NVARCHAR NOT NULL, created_at DATE TIME, updated_at CURRENT TIME STAMP) 
     ON DELETE CASCADE 
     ON UPDATE NO ACTION`);
//close database
db.close((err)=>{
    if (err){
        console.error(err.message)
    }
    console.log("Closed database connection")
});