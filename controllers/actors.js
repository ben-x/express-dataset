const Models = require('../database/database');
const Helpers = require('../helpers/auth')

var createActor = (req, res) => {
   const actor = {
	  name: req.body.name,
	  email: req.body.email,
	  avatar_url: 'default_avatar_url',
	  password: Helpers.hashPassword(req.body.password),
   }
   try {
	Models.actors.insert(actor, function (err, newlyCreatedActor) {
		delete newlyCreatedActor.password;
		const token = Helpers.generateToken(newlyCreatedActor._id, newlyCreatedActor.email)
		newlyCreatedActor.token = token;   
		res.status(201).json(newlyCreatedActor);
	});
   } catch (error) {
        res.status(500).send({ message: 'Something went wrong' });
   }
};


var getAllActors = () => {
	
};

var updateActor = () => {

};

var getStreak = () => {

};


module.exports = {
	createActor: createActor,
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















