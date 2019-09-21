import { Event, Actor, Repo } from '../models';

var getAllEvents = async (req, res) => {

	try {
		const events = await Event.findAll({
			include: [
				{
					model: Actor,
					attributes: ['id', 'login', 'avatar_url'],
				},
				{
					model: Repo,
					attributes: ['id', 'name', 'url'],
				},
			],
			order: [
				['id', 'ASC'],
			],
			attributes: ['id', 'type', 'createdAt'],
		});
		return res.status(200).json({
			status: 200,
			message: 'All Events fetched successfully',
			events
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

var addEvent = async (req, res) => {
	try {
		const { type, actorId, repoId } = req.body;

		const eventObject = {
			type,
			actorId,
			repoId
		};

		const event = await Event.create(eventObject);
		const { id } = event;
		const newevent = await Event.findOne({
			include: [
				{
					model: Actor,
					attributes: ['id', 'login', 'avatar_url'],
				},
				{
					model: Repo,
					attributes: ['id', 'name', 'url'],
				},
			],
			attributes: ['id', 'type', 'createdAt'],
			where: {
				id,
			},
		});
		return res.status(201).json({
			status: 201,
			message: 'Event added successfully',
			newevent
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};


var getByActor = async (req, res) => {
	const { id } = req.params;

	try {
		const actor = await Actor.findAll();
	
		if (!actor) {
			return res.status(404).json({
				status: 404,
				message: 'Actor not found',
			});
		}
		
	const events = await Event.findAll({
		include: [
			{
				model: Actor,
				attributes: ['id', 'login', 'avatar_url'],
				where: {
					id,
				},
				
			  },
			  {
				model: Repo,
				attributes: ['id', 'name', 'url'],
			},
		],
		attributes: ['id', 'type', 'createdAt'],

	});

	return res.status(200).json(events);
} catch (error) {
	return res.status(500).json({
		status: 500,
		message: error.message,
	});
}
};


var eraseEvents = async (req, res) => {
	try {
		await Event.destroy({
			where: {},
			truncate: true
		})
		return res.status(200).json({
			status: 200,
			message: 'All Events successfully deleted',
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: error
		});
	}
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















