const Promise = require('bluebird')
const AppDAO = require('./dao')
const EventRepository = require('./event_repository')
const ActorRepository = require('./actor_repository')
const RepoRepository = require('./repo_repository')

function main() {
  const dao = new AppDAO('./database.sqlite3')
  const expressProjectData = { type: 'PushEvent' }
  const eventRepo = new EventRepository(dao)
  const actorRepo = new ActorRepository(dao)
  const repoRepo = new RepoRepository(dao)
  let eventId

  eventRepo.createTable()
    .then(() => actorRepo.createTable())
    .then(() => repoRepo.createTable())
    .then(() => eventRepo.create(expressProjectData.type))
    .then((data) => {
      eventId = data.id
      const actors = [
        {
          login: 'Outline',
          avatar_url: 'High level overview of sections',
          eventId
        },
        {
          login: 'Write',
          avatar_url: 'Write article contents and code examples',
          eventId
        }
      ]
      const repos = [
        {
          name: 'Repo1',
          url: 'High level overview of sections',
          eventId
        },
        {
          name: 'Reo2',
          url: 'Write article contents and code examples',
          eventId
        }
      ]

      return Promise.all(actors.map((actor) => {
        const { login, avatar_url, eventId } = actor
        return actorRepo.create(login, avatar_url, eventId)
      }), repos.map((repo) => {
        const { name, url, eventId } = repo
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
    // .then((actors) => {
    //   console.log('\nRetrieved event actors from database')
    //   return new Promise((resolve, reject) => {
    //     actors.forEach((actor) => {
    //       console.log(`actor id = ${actor.id}`)
    //       console.log(`actor name = ${actor.name}`)
    //       console.log(`actor description = ${actor.description}`)
    //       console.log(`actor isComplete = ${actor.isComplete}`)
    //       console.log(`actor eventId = ${actor.eventId}`)
    //     })
    //   })
    //   resolve('success')
    // })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    })
}

main()