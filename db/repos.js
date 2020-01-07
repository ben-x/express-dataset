const db = require('./index');

const query = `INSERT INTO repos(name, url) VALUES ('repo1', 'https://github.com/ben-x/express-dataset'), ('repo2', 'https://github.com/ben-x/express-dataset2')`;

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS repos");
  db.run("CREATE TABLE IF NOT EXISTS repos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT)", (err) => {
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
