const Promise = require('bluebird')
const AppDAO = require('./dao')
const EventRepository = require('./event_repository')
const ActorRepository = require('./actor_repository')
const RepoRepository = require('./repo_repository')

function main() {
  const dao = new AppDAO('./database.sqlite3')
  const expressProjectData = {
    id: 40551916,
    type: "PushEvent",
    created_at: "2015-10-03 06:13:31"
  };
  // console.log(expressProjectData);

  const eventRepo = new EventRepository(dao);
  const actorRepo = new ActorRepository(dao);
  const repoRepo = new RepoRepository(dao);
  let eventId


  eventRepo.createTable()
    .then(() => actorRepo.createTable())
    .then(() => repoRepo.createTable())
    .then(() => eventRepo.delete())
    .then(() => {
      console.log(`\nevents deleted `);
    })
    .then(() => actorRepo.delete())
    .then(() => {
      console.log(`\nactors deleted `);
    })
    .then(() => repoRepo.delete())
    .then(() => {
      console.log(`\nrepos deleted `);
    })
    .then(() => {
      // console.log(expressProjectData);

      return eventRepo.create(expressProjectData.id, expressProjectData.type, expressProjectData.created_at)
    })
    .then((data) => {
      console.log(`\n`, data);

      const actor = {
        id: 2790311,
        login: "daniel33",
        avatar_url: "https://avatars.com/2790311"
      }

      const repo = {
        id: 352806,
        name: "johnbolton/exercitationem",
        url: "https://github.com/johnbolton/exercitationem"
      }

      const eventId = data.id;
      actorRepo.create(actor.id, actor.login, actor.avatar_url, eventId);
      repoRepo.create(repo.id, repo.name, repo.url, eventId);
    })
    .then(() => eventRepo.getAll())
    .then((events) => {
      console.log(`\nRetreived events from database`)
      console.log(events);
    })
    .then(() => actorRepo.getAll())
    .then((actors) => {
      console.log(`\nRetreived actors from database`)
      console.log(actors);
    })
    .then(() => repoRepo.getAll())
    .then((repos) => {
      console.log(`\nRetreived repos from database`)
      console.log(repos);
    })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    })
}

main()