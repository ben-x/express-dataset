const Promise = require('bluebird');
const AppDAO = require('./../dao');
const ActorRepository = require('./../actor_repository');

const dao = new AppDAO('./database.sqlite3');
const actorRepo = new ActorRepository(dao);

var getAllActors = () => {
	return actorRepo
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

var updateActor = async (id, login, avatar_url) => {
const fetchActor = await actorRepo.getById(id);
if (!fetchActor) {
	return {status: false, data: 'No actor with this id'};
}
	return actorRepo
		.update(id, avatar_url)
		.then(data => {			
				return {status: true, data};
		})
		.catch(err => {
			console.log('Error: ');
			console.log(JSON.stringify(err));
			return err;
		});
};

var getStreak = () => {};

module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};
