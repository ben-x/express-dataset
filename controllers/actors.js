const Promise = require('bluebird')
const AppDAO = require('./../dao')
const ActorRepository = require('./../actor_repository')

const dao = new AppDAO('./database.sqlite3')
const actorRepo = new ActorRepository(dao)

var getAllActors = () => {
	var actors = actorRepo.getAll();
	return actors
};

var updateActor = () => {

};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















