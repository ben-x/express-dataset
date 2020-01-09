class RepoRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS repos (
      id INTEGER PRIMARY KEY,
      name TEXT,
      url TEXT,
      eventId INTEGER,
      CONSTRAINT repos_fk_eventId FOREIGN KEY (eventId)
          REFERENCES events(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql)
  }

  create(id, name, url, eventId) {
    return this.dao.run(
      `INSERT INTO repos (id, name, url, eventId)
        VALUES (?, ?, ?, ?)`,
      [id, name, url, eventId])
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM repos WHERE id = ?`,
      [id])
  }

    // delete all repos
    delete() {
      return this.dao.run(
        `DELETE FROM repos`
      )
    }

  // get all repos
  getAll() {
    return this.dao.all(`SELECT * FROM repos`)
  }
}

module.exports = RepoRepository;