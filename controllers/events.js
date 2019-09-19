var db = require('../helpers/db');

var getAllEvents = () => {
	var allEvents = db.viewAllEvents();
	console.log('ALL EVENTS', allEvents);
};

var addEvent = () => {
	const createEvent = db.createEvent()
};


var getByActor = () => {

};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















