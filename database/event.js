const db = require('./index');

db.exec("PRAGMA foreign_keys = ON")  //enable the foreign key constraint
db.serialize(()=>{
  db.run("DROP TABLE IF EXISTS event");
  db.run('CREATE TABLE IF NOT EXISTS event (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, actor_id, repo_id, created_at datetime default current_timestamp, FOREIGN KEY (actor_id) REFERENCES actors(id), FOREIGN KEY (repo_id) REFERENCES repos(id)', (err)=>{
    if(err){
      return console.log(err);
    }
  })
})