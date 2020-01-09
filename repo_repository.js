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
      actor INTEGER,
      CONSTRAINT repos_fk_actor FOREIGN KEY (actor)
          REFERENCES actors(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql)
  }

	deleteTable() {
		const esql = `
      DROP TABLE repos`;
		return this.dao.run(esql);
	}

  create(id, name, url, actor) {
    return this.dao.run(
      `INSERT INTO repos (id, name, url, actor)
        VALUES (?, ?, ?, ?)`,
      [id, name, url, actor])
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