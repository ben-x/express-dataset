const db = require("../models");
const formatEventOutput = require("../helpers/formatEventOutput");

const getAllEvents = async (req, res, next) => {
  try {
    const query = `SELECT *, e.id FROM events e INNER JOIN actors a ON a.id = e.actor_id INNER JOIN repos r ON r.id = e.repo_id ORDER BY e.id ASC`;
    const result = await db.getAll(query);
    const events = formatEventOutput(result);

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const addEvent = async (req, res, next) => {
  try {
    const body = req.body;

    if (
      !body.id ||
      !body.type ||
      !body.actor ||
      !body.repo ||
      !body.created_at
    ) {
      return res
        .status(400)
        .json({ error: "content missing. Please verify your data" });
    }

    const result = await db.getOne(`SELECT * FROM events WHERE id = ?`, [
      body.id,
    ]);

    if (result) {
      return res.status(400).json({});
    }

    const oneActor = await db.getOne(`SELECT * FROM actors WHERE id = ?`, [
      body.actor.id,
    ]);
    if (!oneActor) {
      const { id: actor_id, login, avatar_url } = body.actor;
      await db.execute(
        `INSERT INTO actors (id, login, avatar_url)
      VALUES (?, ?, ?)`,
        [actor_id, login, avatar_url]
      );
    }

    const oneRepo = await db.getOne(`SELECT * FROM repos WHERE id = ?`, [
      body.repo.id,
    ]);
    if (!oneRepo) {
      const { id: repo_id, name, url } = body.repo;
      await db.execute(
        `INSERT INTO repos (id, name, url)
        VALUES (?, ?, ?)`,
        [repo_id, name, url]
      );
    }

    const { id, type, created_at, actor, repo } = body;
    await db.execute(
      `INSERT INTO events (id, type, actor_id, repo_id, created_at)
        VALUES (?, ?, ?, ?, ?)`,
      [id, type, actor.id, repo.id, created_at]
    );

    res.status(201).json({});
  } catch (error) {
    next(error);
  }
};

const getByActor = async (req, res, next) => {
  try {
    const params = req.params;
    const actor = await db.getOne(`SELECT * FROM actors WHERE id = ?`, [
      params.actorId,
    ]);

    if (!actor) {
      return res.status(404).json({});
    }

    const query = `SELECT e.id, e.type,e.created_at,a.id as actor_id,a.login,a.avatar_url,r.id as repo_id,r.name,r.url
    FROM events e
    INNER JOIN actors a ON (a.id= e.actor_id)
    INNER JOIN repos r ON (r.id =e.repo_id)
    WHERE e.actor_id = ?
    ORDER BY e.id ASC;`;

    const result = await db.getAll(query, [params.actorId]);
    const events = formatEventOutput(result);

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const eraseEvents = async (req, res, next) => {
  try {
    const query = `DELETE FROM events;`;

    const events = await db.execute(query);
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  addEvent,
  getByActor,
  eraseEvents,
};
