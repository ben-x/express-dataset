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
      actorId INTEGER,
      CONSTRAINT repos_fk_actorId FOREIGN KEY (actorId)
          REFERENCES actors(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql)
  }

	deleteTable() {
		const esql = `
      DROP TABLE repos`;
		return this.dao.run(esql);
	}

  create(id, name, url, actorId) {
    return this.dao.run(
      `INSERT INTO repos (id, name, url, actorId)
        VALUES (?, ?, ?, ?)`,
      [id, name, url, actorId])
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