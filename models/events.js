const createEventTable = `
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    actorId INTEGER NOT NULL,
    repoId INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (repoId) REFERENCES repos (id),
    FOREIGN KEY (actorId) REFERENCES actors (id)
  )
`;

const createEventQuery = `
  INSERT INTO events(id,type,actorId, repoId, created_at) 
  VALUES($1, $2, $3, $4, $5);
`;
const getAllEvents = `SELECT * FROM events INNER JOIN actors ON events.actorId=actors.id INNER JOIN repos ON events.repoId=repos.id ORDER BY id ASC`;

module.exports = {
  createEventTable,
  createEventQuery,
  getAllEvents
}