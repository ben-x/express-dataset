import { Actor, Event } from '../models';

var getAllActors = async (req, res) => {
	try {
		const allActors = await Actor.findAll({
			include: [
				{
					model: Event,
					attributes: ['id', 'type', 'createdAt'],

				},
			],
			order: [
				['createdAt', 'DESC'],
				['login', 'DESC'],
			],
			attributes: ['id', 'login', 'avatar_url'],

		});
		return res.status(200).json(allActors);
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

var updateActor = async (req, res) => {
	const { id } = req.params;
	try {
		const actor = await Actor.findOne({
			where: {
				id,
			},
		});

		if (!actor) {
			return res.status(404).json({
				status: 404,
				message: 'Actor not found',
			});
		}

		const { avatar_url } = req.body;

		const updatedActor = await actor.update({ avatar_url });
		return res.status(200).json({
			status: 200,
			message: 'Actor updated successfully',
			updatedActor
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

var getStreak = async(req, res) => {
	try {
		const allActors = await Actor.findAll({
			include: [
				{
					model: Event,
					attributes: ['id', 'type', 'createdAt'],

				},
			],
			order: [
				['createdAt', 'DESC'],
				['login', 'DESC'],
			],
			attributes: ['id', 'login', 'avatar_url'],

		});
		return res.status(200).json(allActors);
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















