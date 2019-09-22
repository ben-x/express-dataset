
class RepoModel {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS repos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      repoName TEXT,
      repoUrl TEXT)`
    return this.dao.run(sql)
  }

  create(repoName, repoUrl) {
    return this.dao.run(
      `INSERT INTO repos (repoName, repoUrl)
        VALUES (?, ?)`,
      [repoName, repoUrl])
  }
}

module.exports = RepoModel;