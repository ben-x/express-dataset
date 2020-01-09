class EventRepository {
  constructor(dao) {
    this.dao = dao
  }

  // created_at DATETIME DEFAULT CURRENT_TIMESTAMP

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY,
        type TEXT,
        created_at TEXT
)`
    return this.dao.run(sql)
  }

  deleteTable(){
    const esql = `
      DROP TABLE events`;
    return this.dao.run(esql)
  }

  create(id, type, created_at) {
    return this.dao.run(
      'INSERT INTO events (id, type, created_at) VALUES (?, ?, ?)',
      [id, type, created_at])
  }

  // delete by id
  delete(id) {
    return this.dao.run(
      `DELETE FROM events WHERE id = ?`,
      [id]
    )
  }

  // delete all events
  delete() {
    return this.dao.run(
      `DELETE FROM events`
    )
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM events WHERE id = ?`,
      [id])
  }

  // get event by actorId
  getEvents(actorId) {
    return this.dao.all(
      `SELECT * FROM events WHERE actorId = ?`,
      [actorId])
  }

  // get all events
  getAll() {
    return this.dao.all(`SELECT * FROM events`)
  }
}

module.exports = EventRepository;