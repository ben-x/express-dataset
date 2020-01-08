class EventRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT
)`
    return this.dao.run(sql)
  }

  create(type) {
    return this.dao.run(
      'INSERT INTO events (type) VALUES (?)',
      [type])
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
      `DELETE * FROM events`
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