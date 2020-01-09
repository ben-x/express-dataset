class ActorRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS actors (
      id INTEGER PRIMARY KEY,
      login TEXT,
      avatar_url TEXT,
      eventId INTEGER,
      CONSTRAINT actors_fk_eventId FOREIGN KEY (eventId)
          REFERENCES events(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql)
  }

  create(id, login, avatar_url, eventId) {
    return this.dao.run(
      `INSERT INTO actors (id, login, avatar_url, eventId)
        VALUES (?, ?, ?, ?)`,
      [id, login, avatar_url, eventId])
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM actors WHERE id = ?`,
      [id])
  }

    // delete all actors
    delete() {
      return this.dao.run(
        `DELETE FROM actors`
      )
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