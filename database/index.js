const sqlite3 = require('sqlite3').verbose();
 
const dbSource = './database/ribyFin.db';

const db = new sqlite3.Database(dbSource, (err) => {
  if (err) {
    console.error(err.message);
    throw err
  }
  console.log('Successful connection to the database.');
});

module.exports = db;
