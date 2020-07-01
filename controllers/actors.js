const db = require("../models");

const getAllActors = async (req, res, next) => {
  try {
    const sql = `SELECT a.id, a.login, a.avatar_url FROM actors a INNER JOIN events e ON (e.actor_id = a.id) GROUP BY a.id ORDER BY COUNT() DESC, e.created_at DESC, a.login ASC`;

    const result = await db.getAll(sql);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateActor = async (req, res, next) => {
  try {
    const body = req.body;

    if (Object.keys(body).length > 3) {
      return res.status(400).json({});
    }

    if (!body.id || !body.avatar_url) {
      return res.status(400).json({});
    }

    const actor = await db.getOne(`SELECT * FROM actors WHERE id = ?`, [
      body.id,
    ]);
    if (!actor) {
      return res.status(404).json({});
    }

    if (body.login !== actor.login || body.id !== actor.id) {
      return res.status(400).json({});
    }

    const result = await db.execute(
      `UPDATE actors SET avatar_url = ? WHERE id = ?`,
      [body.avatar_url, body.id]
    );

    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

const getStreak = async (req, res, next) => {
  try {
    const sql = `
                SELECT a.id, a.login, a.avatar_url,COUNT(*) as streak FROM

                (SELECT e1.actor_id,e1.created_at,date(e1.created_at,-(SELECT COUNT(*) FROM events e2 WHERE julianday(e1.created_at)-julianday(e2.created_at))||' day')AS grp from events e1) events
                INNER JOIN actors a ON (actor_id = a.id)
                GROUP BY actor_id
                ORDER BY streak DESC, created_at DESC, a.login ASC`;

    const result = await db.getAll(sql);

    const r = result.map((res)=>{
      delete res.streak;
      return res;
    })

    res.status(200).json(r);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateActor,
  getAllActors,
  getStreak,
};
