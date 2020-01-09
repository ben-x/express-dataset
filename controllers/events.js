const Promise = require('bluebird');
const AppDAO = require('./../dao');
const EventRepository = require('./../event_repository');
const ActorRepository = require('./../actor_repository');
const RepoRepository = require('./../repo_repository');

const dao = new AppDAO('./database.sqlite3');

const eventRepo = new EventRepository(dao);
const actorRepo = new ActorRepository(dao);
const repoRepo = new RepoRepository(dao);

var getAllEvents = () => {
	return eventRepo
		.getAll()
		.then(data => {
			return data;
		})
		.catch(err => {
			console.log('Error: ');
			console.log(JSON.stringify(err));
			return err;
		});
};

var addEvent = async eventBody => {
	return eventRepo
		.createTable()
		.then(() => actorRepo.createTable())
		.then(() => repoRepo.createTable())
		.then(async () => {
			const event = await eventRepo.create(
				eventBody.id,
				eventBody.type,
				eventBody.created_at
			);
			return eventRepo.getById(event.id);
		})
		.then(async data => {
			
			const eventId = data.id;
			const { actor, repo } = eventBody;
			const createActor = await actorRepo.create(
				actor.id,
				actor.login,
				actor.avatar_url,
				eventId
			);
			const createRepo = await repoRepo.create(
				repo.id,
				repo.name,
				repo.url,
				eventId
			);			

			const newActor = await actorRepo.getById(createActor.id);
			const newRepo = await repoRepo.getById(createRepo.id);
			const newEvent = {
				id: data.id,
				type: data.type,
				actor: newActor,
				repo: newRepo,
				created_at: data.created_at
			};

			return newEvent;
		})
		.catch(err => {
			console.log('Error: ');
			console.log(JSON.stringify(err));
			return JSON.stringify(err);
		});
};

var getByActor = (actorId) => {
	return eventRepo
	.getEvents(actorId)
	.then(data => {
		return data;
	})
	.catch(err => {
		console.log('Error: ');
		console.log(JSON.stringify(err));
		return err;
	});

};

var eraseEvents = () => {};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};
