const createActorTable = `
  CREATE TABLE IF NOT EXISTS actors (
    id INTEGER PRIMARY KEY,
    login TEXT NOT NULL,
    avatar_url TEXT NOT NULL
  )
`;

const createActor = `
  INSERT INTO actors(id, login, avatar_url) 
  VALUES($1, $2, $3)
`;

module.exports = {
    createActorTable,
    createActor
}