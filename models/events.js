const createEventTable = `
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    actor_id INTEGER NOT NULL,
    repo_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (actor_id) REFERENCES actors (iD),
    FOREIGN KEY (repo_id) REFERENCES repos (repo_id)
  )
`;

const createEventQuery = `
INSERT INTO events(repo_id, actor_id, id, type, created_at) 
VALUES(?, ?, ?, ?, ?);
`;
const getAllEvents = `SELECT * FROM events INNER JOIN actors ON actors.iD = events.actor_id INNER JOIN repos ON repos.repo_id = events.repo_id ORDER BY id ASC`;
const getEventByActorId = `SELECT * FROM events INNER JOIN actors ON actors.iD = events.actor_id INNER JOIN repos ON repos.repo_id = events.repo_id  WHERE actor_id=? ORDER BY id ASC`;
const eraseEvents = `DELETE FROM events`;

module.exports = {
  createEventTable,
  createEventQuery,
  getAllEvents,
  getEventByActorId,
  eraseEvents
}