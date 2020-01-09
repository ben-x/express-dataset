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
	const { actor, repo } = eventBody;
	return actorRepo
		.createTable()
		.then(() => repoRepo.createTable())
		.then(() => eventRepo.createTable())
		.then(async () => {
			// create actor if not already created
			const fetchActor = await actorRepo.getById(actor.id);
			if (fetchActor && fetchActor.id) {
				return fetchActor;
			} else {
				const createActor = await actorRepo.create(
					actor.id,
					actor.login,
					actor.avatar_url
				);
				return actorRepo.getById(createActor.id);
			}
		})
		.then(async actor => {
			// create repo if not already created
			const fetchRepo = await repoRepo.getById(repo.id);
			if (fetchRepo && fetchRepo.id) {
				return { actor, fetchRepo };
			} else {
				const createRepo = await repoRepo.create(
					repo.id,
					repo.name,
					repo.url,
					actor.id
				);
				const fetchRepo = await repoRepo.getById(createRepo.id);
				return { actor, fetchRepo };
			}
		})
		.then(async data => {
			const eventId = eventBody.id;
			const fetchEvent = await eventRepo.getById(eventId);
			// if event already exist,
			if (fetchEvent && fetchEvent.id) {
				throw new Error('EventId already exist');
			} else {
				const event = await eventRepo.create(
					eventBody.id,
					eventBody.type,
					(actorId = data.actor.id),
					(repoId = data.fetchRepo.id),
					eventBody.created_at
				);
				const fetchEvent = await eventRepo.getById(event.id);
				const newEvent = {
					id: fetchEvent.id,
					type: fetchEvent.type,
					actor: data.actor,
					repo: data.fetchRepo,
					created_at: fetchEvent.created_at
				};

				return newEvent;
			}
		})
		.catch(err => {
			console.log('Error: ');
			console.log(JSON.stringify(err));
			return JSON.stringify(err);
		});
};

var getByActor = actorId => {
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

var eraseEvents = () => {
	return eventRepo
	.delete()
	.then(data => {
		return data;
	})
	.catch(err => {
		console.log('Error: ');
		console.log(JSON.stringify(err));
		return err;
	});

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};
