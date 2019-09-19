var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db.db');

db.serialize(function() {
  return db.run("CREATE TABLE IF NOT EXISTS events (id INTEGER, type TEXT, actor_id INTEGER, login TEXT, avatar_url TEXT, repo_id INTEGER, name TEXT, url TEXT, created_at TEXT)");
});

function insertEvent() {
  db.serialize(function() {
    return db.run("INSERT INTO events(id, type, actor_id, login, avatar_url, repo_id, name, url, created_at) VALUES($id, $type, $actor_id, $login, $avatar, $repo_id, $name, $url, $created_at)", [1, 'life', 1, 'lifeman', 'life', 1, 'lifey', 'coolman', 'today']);
  });
}

function selectAllEvents() {
  db.serialize(function () {
    db.each("SELECT * FROM events", function (err, row) {
      console.log(row);
    })
  });
}

function selectEventByAuthorId(id) {
  db.serialize(function() {
    return db.run("SELECT * FROM events WHERE actor_id = $1", [id]);
  });
}

module.exports = {
  createEvent: insertEvent,
  viewAllEvents: selectAllEvents,
  selectEventByAuthor: selectEventByAuthorId
};
