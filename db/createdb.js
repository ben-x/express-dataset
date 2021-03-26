const db = require('./connection');


const sql = `
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY NOT NULL,
        type TEXT NOT NULL,
        created_at TEXT NOT NULL
        )`;

//FOREIGN KEY(event_id) REFERENCES events(id)

const sql1 = `
    CREATE TABLE IF NOT EXISTS actor (
        actor_id INTEGER NOT NULL,
        login TEXT NOT NULL,
        avatar_url TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
        )`;

const sql2 = `
    CREATE TABLE IF NOT EXISTS repo (
        repo_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
        )`;

db.run(sql,err=>{
    if(err){
        console.log(err.message)
    }else
        console.log('Table created successfully...')
});

db.run(sql1,err=>{
    if(err){
        console.log(err.message)
    }else
        console.log('Table 1 created successfully...')
});

db.run(sql2,err=>{
    if(err){
        console.log(err.message)
    }else
        console.log('Table 2 created successfully...')
});

db.close()