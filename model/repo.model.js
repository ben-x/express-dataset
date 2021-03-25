const createRepoTable = `
  CREATE TABLE IF NOT EXISTS repos (
    repo_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL
  )
`;

const createRepo = `
  INSERT INTO repos(repo_id, name, url) 
  VALUES(?, ?, ?)
`;

module.exports = {
    createRepoTable,
    createRepo
}