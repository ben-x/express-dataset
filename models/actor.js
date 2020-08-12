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

module.exports = {
  createActorTable,
  createActor
}