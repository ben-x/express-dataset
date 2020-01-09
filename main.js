const Promise = require('bluebird');
const AppDAO = require('./dao');
const EventRepository = require('./event_repository');
const ActorRepository = require('./actor_repository');
const RepoRepository = require('./repo_repository');

function main() {
	const dao = new AppDAO('./database.sqlite3');
	const expressProjectData = {
		id: 40551916,
		type: 'PushEvent',
		created_at: '2015-10-03 06:13:31'
	};
	// console.log(expressProjectData);

	const eventRepo = new EventRepository(dao);
	const actorRepo = new ActorRepository(dao);
	const repoRepo = new RepoRepository(dao);
	let eventId;

	eventRepo
		.createTable()
		.then(() => actorRepo.createTable())
		.then(() => repoRepo.createTable())
		.then(() => eventRepo.delete())
		.then(() => eventRepo.deleteTable())
		.then(() => repoRepo.deleteTable())
		.then(() => actorRepo.deleteTable())
		.then(() => {
			console.log(`\nevents deleted `);
		})
		.then(() => repoRepo.delete())
		.then(() => repoRepo.deleteTable())
		.then(() => {
			console.log(`\nrepos deleted `);
		})
		.then(() => actorRepo.delete())
		.then(() => actorRepo.deleteTable())
		.then(() => {
			console.log(`\nactors deleted `);
		})
		.catch(err => {
			console.log('Error: ');
			console.log(JSON.stringify(err));
		});
}

main();
