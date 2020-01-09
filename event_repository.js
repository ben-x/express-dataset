class EventRepository {
	constructor(dao) {
		this.dao = dao;
	}

	// created_at DATETIME DEFAULT CURRENT_TIMESTAMP

	createTable() {
		const sql = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY,
        type TEXT,
        actor INTEGER,
        repo INTEGER,
        created_at TEXT,
        CONSTRAINT events_fk_repo FOREIGN KEY (repo)
          REFERENCES repos(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
		return this.dao.run(sql);
	}

	deleteTable() {
		const esql = `
      DROP TABLE events`;
		return this.dao.run(esql);
	}

	create(id, type, actor, repo, created_at) {
		return this.dao.run(
			'INSERT INTO events (id, type, actor, repo, created_at) VALUES (?, ?, ?, ?, ?)',
			[id, type, actor, repo, created_at]
		);
	}

	// delete by id
	delete(id) {
		return this.dao.run(`DELETE FROM events WHERE id = ?`, [id]);
	}

	// delete all events
	delete() {
		return this.dao.run(`DELETE FROM events`);
	}

	getById(id) {
		return this.dao.get(`SELECT * FROM events WHERE id = ?`, [id]);
	}

	// get event by actor
	getEvents(actor) {
		return this.dao.all(`SELECT * FROM events WHERE actor = ? ORDER BY id`, [actor]);
	}

	// get all events
	getAll() {
		return this.dao.all(`SELECT * FROM events ORDER BY id`);
  }
  
  // getAll() {
	// 	return this.dao.all(`SELECT actors.*, events.id, events.type, events.created_at FROM actors, events LEFT JOIN actors ON events.actor = actors.id`);
	// }
}

module.exports = EventRepository;
