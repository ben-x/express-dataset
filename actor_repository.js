class ActorRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS actors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT,
      avatar_url TEXT,
      eventId INTEGER,
      CONSTRAINT actors_fk_eventId FOREIGN KEY (eventId)
          REFERENCES events(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql)
  }

  create(login, avatar_url, eventId) {
    return this.dao.run(
      `INSERT INTO actors (login, avatar_url, eventId)
        VALUES (?, ?, ?)`,
      [login, avatar_url, eventId])
  }

  update(id, avatar_url) {
    return this.dao.run(
      `UPDATE actors
      SET avatar_url = ?,
      WHERE id = ?`,
      [ avatar_url, id]
    )
  }

  // get all actors
  getAll() {
    return this.dao.all(`SELECT * FROM actors`)
  }
}

module.exports = ActorRepository;