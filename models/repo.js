const createRepoTable = `
  CREATE TABLE IF NOT EXISTS repos (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL
  )
`;

const createRepo = `
  INSERT INTO repos(id, name, url) 
  VALUES(?, ?, ?)
`;

module.exports = {
    createRepoTable,
    createRepo
}