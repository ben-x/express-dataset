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
		const token = Helpers.generateToken(newlyCreatedActor._id, newlyCreatedActor.email, newlyCreatedActor.avatar_url)
		newlyCreatedActor.token = token;   
		res.status(201).json(newlyCreatedActor);
	});
   } catch (error) {
        res.status(500).send({ message: 'Something went wrong' });
   }
};

var signIn = (req, res) => {
	try {
		Models.actors.findOne({ email: req.body.email }, function (err, actor) {
		  if(!actor) {
			res.status(401).send({ message: 'Incorrect Credentials' });
		  } else if (!Helpers.comparePassword(actor.password, req.body.password)) {
			res.status(401).send({ message: 'Incorrect Credentials' });
		  } else {
			delete actor.password;
			actor.login = actor.email
			const token = Helpers.generateToken(actor._id, actor.email, actor.avatar_url);
			actor.token = token;
			res.status(200).json(actor);
		  }
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
	signIn: signIn,
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















