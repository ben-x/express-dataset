class ActorModel {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS actors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT,
      avatarUrl TEXT)`
    return this.dao.run(sql)
  }

  create(login, avatarUrl) {
    return this.dao.run(
      'INSERT INTO actors (login, avatarUrl) VALUES (?, ?)',
      [login, avatarUrl])
  }
}

module.exports = ActorModel;