const getActors = (events) => events.map((event) => event.actor);

module.exports = {
	getActors: getActors,
};
