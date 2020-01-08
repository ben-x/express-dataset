class RepoRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS repos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      url TEXT,
      eventId INTEGER,
      CONSTRAINT repos_fk_eventId FOREIGN KEY (eventId)
          REFERENCES events(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql)
  }

  create(name, url, eventId) {
    return this.dao.run(
      `INSERT INTO repos (name, url, eventId)
        VALUES (?, ?, ?)`,
      [name, url, eventId])
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