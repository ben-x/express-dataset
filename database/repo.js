const db = require('./index');

const query = `INSERT INTO repos(name, url) VALUES ('johnbolton/exercitationem', 'https://github.com/johnbolton/exercitationem'), ('pestrada/voluptatem', 'https://github.com/pestrada/voluptatem')`;

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS repo");
  db.run("CREATE TABLE IF NOT EXISTS repo (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT)", (err) => {
    if (err) {
      return console.log(err);
    }
  });
  db.run(query, (err) => {
    if (err) {
      return console.log(err);
    }
  });
});