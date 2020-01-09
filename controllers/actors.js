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

var updateActor = () => {};

var getStreak = () => {};

module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};
