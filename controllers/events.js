const moment = require('moment');
const Models = require('../database/database');
const Utils = require('../helpers/sortById');
const updater = require('../helpers/updateEventCount');

const getAllEvents = (req, res) => {
	try {
	  Models.events.find({}, (err, events) => {
		Utils.sortById(events) 
		res.status(200).json(events);
		});
	} catch (error) {
		res.status(500).send({ message: 'Something went wrong' });
	}
};

const addEvent = (req, res) => {
	const event = {
		type: 'Push Event',
		actor: {
			id: req.user.userId,
			login: req.user.email,
			avatar_url: req.user.avatar_url
		},
		repo: {
		  id: req.body.id,
		  name: req.body.name,
		  url: req.body.url
		},
		create_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
	}
	try {
		Models.events.insert(event, (err, newlyCreatedEvent) => { 
			updater.updateEventCount(req.user.userId)  
			res.status(201).json(newlyCreatedEvent);
		});
	} catch (error) {
		res.status(500).send({ message: 'Something went wrong' });
	}

};


const getByActor = (req, res) => {
	try {
		Models.events.find({ 'actor.id': req.params.id }, (err, events) => {
			res.status(200).send(events)
		  });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const eraseEvents = (req, res) => {
	try {
		Models.events.remove({}, { multi: true }, (err, numRemoved) => {
			res.status(200).send({ message: `${numRemoved} events deleted!` })
		});
	} catch (error) {
		res.status(500).send({ message: 'Something went wrong' })
	}
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents,
};

















