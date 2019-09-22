const Promise = require("bluebird");
const AppDAO = require("./dao");
const ActorModel = require("./database/actor.database");
const RepoModel = require("./database/repo.database");
const EventModel = require("./database/event.database");

function main() {
  const dao = new AppDAO("./database.sqlite3");
  const blogProjectData = { name: "Write Node.js - SQLite Tutorial" };
  const actor = new ActorModel(dao);
  const repo = new RepoModel(dao);
  const event = new EventModel(dao);
  let actorId;
  let repoId;

  actor
    .createTable()
    .then(() => repo.createTable())
    .then(() => event.createTable())
    .then(() =>
      actor.create(
        "ronaldo",
        "https://i2.wp.com/metro.co.uk/wp-content/uploads/2019/09/GettyImages-11673530801.jpg?quality=90&strip=all&zoom=1&resize=644%2C428&ssl=1"
      )
    )
    .then(data => {
      actorId = repoId;
      repo.create("some-repo", "github.com/some-repo");
    })
    .then(repoData => {
      repoId = repoData.id;
      const events = [
        {
          type: "push",
          actorId,
          repoId
        },
        {
          type: "pull",
          actorId,
          repoId
        }
      ];
      return Promise.all(
        events.map(event => {
          const { type, actorId, repoId } = task;
          return taskRepo.create(type, actorId, repoId);
        })
      );
      resolve("success");
    })
    .catch(err => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
}

main();
