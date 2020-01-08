const Promise = require('bluebird')
const AppDAO = require('./dao')
const EventRepository = require('./event_repository')
const ActorRepository = require('./actor_repository')
const RepoRepository = require('./repo_repository')

function main() {
  const dao = new AppDAO('./database.sqlite3')
  const expressProjectData = {
    type: 'PullEvent',
    created_at: '2015-10-03 06:13:31'
  }
  const eventRepo = new EventRepository(dao)
  const actorRepo = new ActorRepository(dao)
  const repoRepo = new RepoRepository(dao)
  let eventId

  // // delete events, actors and repos
  // eventRepo.delete()
  // .then(() => {
  //   console.log(`\nevents deleted `);
  // })
  // .then(() => actorRepo.delete())
  // .then(() => {
  //   console.log(`\nactors deleted `);
  // })
  // .then(() => repoRepo.delete())
  // .then(() => {
  //   console.log(`\nrepos deleted `);
  // })

  // // delete events table
  // eventRepo.deleteTable()
  // .then(() => {
  //   console.log(`\ntable deleted `);
  // })

  eventRepo.createTable()
    .then(() => actorRepo.createTable())
    .then(() => repoRepo.createTable())
    .then(() => eventRepo.create(expressProjectData.type))
    .then((data) => {
      eventId = data.id
      const actors = [{
          login: 'daniel33',
          avatar_url: 'https://avatars.com/2790311',
          eventId
        },
        {
          login: 'eric66',
          avatar_url: 'https://avatars.com/2907782',
          eventId
        }
      ]
      const repos = [{
          name: 'johnbolton/exercitationem',
          url: 'https://github.com/johnbolton/exercitationem',
          eventId
        },
        {
          name: 'pestrada/voluptatem',
          url: 'https://github.com/pestrada/voluptatem',
          eventId
        }
      ]

      return Promise.all(actors.map((actor) => {
        const {
          login,
          avatar_url,
          eventId
        } = actor
        return actorRepo.create(login, avatar_url, eventId)
      }), repos.map((repo) => {
        const {
          name,
          url,
          eventId
        } = repo
        return repoRepo.create(name, url, eventId)
      }))
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