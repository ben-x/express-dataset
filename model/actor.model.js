const createActorTable = `
  CREATE TABLE IF NOT EXISTS actors (
    iD INTEGER PRIMARY KEY,
    login TEXT NOT NULL,
    avatar_url TEXT NOT NULL
  )
`;

const createActor = `
  INSERT INTO actors(iD, login, avatar_url) 
  VALUES($1, $2, $3)
`;
const getAllActors = `
  SELECT *, (SELECT COUNT() FROM events WHERE actors.iD = events.actor_id) as count FROM actors
  ORDER BY count DESC, actors.login
`;

const updateActor = `UPDATE actors SET avatar_url=$1 WHERE id=$2`;
const getActorsStreak = `
                SELECT a.id, a.login, a.avatar_url,COUNT(*) as streak FROM
                (SELECT e1.actor_id,e1.created_at,date(e1.created_at,-(SELECT COUNT(*) FROM events e2 WHERE julianday(e1.created_at)-julianday(e2.created_at))||' day')AS grp from events e1) events
                INNER JOIN actors a ON (actor_id = a.id)
                GROUP BY actor_id
                ORDER BY streak DESC, created_at DESC, a.login ASC`;

module.exports = {
  createActorTable,
  createActor,
  getAllActors,
  updateActor,
  getActorsStreak
}