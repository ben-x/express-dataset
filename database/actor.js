const db = require('./index');

const query = `INSERT INTO actors(login, avatar_url) VALUES ('iholloway', 'https://avatars.com/4276597'), ('oscarschmidt', 'https://avatar.com/2917996')`;
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS actors");
  db.run("CREATE TABLE IF NOT EXISTS actors (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT, avatar_url TEXT)", (err) => {
    if (err) {
      return console.log(err);
    }
  })
  db.run(query, (err) => {
    if (err) {
      return console.log(err);
    }
  })
});
