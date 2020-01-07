const sqlite3 = require('sqlite3').verbose();
 
// create the database connection
const db = new sqlite3.Database('./db/riby.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

module.exports = db;
