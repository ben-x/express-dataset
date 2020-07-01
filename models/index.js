const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const Promise = require("bluebird");

const db_name = path.join("data", "apptest.db");

const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});

const dropActors = `DROP TABLE IF EXISTS actors;`;
const dropRepos = `DROP TABLE IF EXISTS repos;`;
const dropEvents = `DROP TABLE IF EXISTS events;`;

const createActorsTable = `
CREATE TABLE IF NOT EXISTS actors (
  id INTEGER PRIMARY KEY,
  login VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(100) NOT NULL
);`;

const createReposTable = `
CREATE TABLE IF NOT EXISTS repos (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  url VARCHAR(100) NOT NULL
);`;

const createEventsTable = `
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  actor_id INTEGER NOT NULL,
  repo_id INTEGER NOT NULL,
  created_at datetime_text NOT NULL,
  FOREIGN KEY (actor_id)
  REFERENCES users (id)
  FOREIGN KEY (repo_id)
  REFERENCES repos (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);
`;


const seedActors = `INSERT INTO actors (id, login, avatar_url) VALUES
(2790311, 'daniel33', 'https://avatars.com/2790311'),
(2907782, 'eric66', 'https://avatars.com/2907782'),
(4276597, 'iholloway', 'https://avatars.com/4276597');`;


const seedRepos = `INSERT INTO repos (id, name, url) VALUES
(352806, 'johnbolton/exercitationem', 'https://github.com/johnbolton/exercitationem'),
(426482, 'pestrada/voluptatem', 'https://github.com/pestrada/voluptatem'),
(269910, 'iholloway/aperiam-consectetur', 'https://github.com/iholloway/aperiam-consectetur');
`;

const seedEvents = ` INSERT INTO events (id, type, actor_id, repo_id,created_at) VALUES
(4055191679, 'PushEvent', '2790311','352806','2015-10-03 06:13:31'),
(2712153979, 'PushEvent', '2907782','426482','2014-07-13 08:13:31'),
(4633249595, 'PushEvent', '4276597','269910','2016-04-18 00:13:31');
`;




db.serialize(() => {
  db.run(dropActors, (error) => {
    if (error) {
      return console.log(error);
    }
  });
  db.run(dropEvents, (error) => {
    if (error) {
      return console.log(error);
    }
  });
  db.run(dropRepos, (error) => {
    if (error) {
      return console.log(error);
    }
  });
  db.run(createActorsTable, (error) => {
    if (error) {
      return console.log(error);
    }
  });
  db.run(createReposTable, (error) => {
    if (error) {
      return console.log(error);
    }
  });
  db.run(createEventsTable, (error) => {
    if (error) {
      return console.log(error);
    }
  });
});

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err, result) => {
      if (err) {
        console.log("Error running sql " + sql);
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, result) => {
      if (err) {
        console.log("Error running sql: " + sql);
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.log("Error running sql: " + sql);
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

db.execute = run;
db.getOne = get;
db.getAll = all;



module.exports = db;
