class ActorRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS actors (
      id INTEGER PRIMARY KEY,
      login TEXT,
      avatar_url TEXT
)`
    return this.dao.run(sql)
  }

	deleteTable() {
		const esql = `
      DROP TABLE actors`;
		return this.dao.run(esql);
	}

  create(id, login, avatar_url) {
    return this.dao.run(
      `INSERT INTO actors (id, login, avatar_url)
        VALUES (?, ?, ?)`,
      [id, login, avatar_url])
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
      SET avatar_url = ?
      WHERE id = ?`,
      [avatar_url, id]
    )
  }

  // get all actors
  getAll() {
    return this.dao.all(`SELECT * FROM actors`)
  }
}

module.exports = ActorRepository;