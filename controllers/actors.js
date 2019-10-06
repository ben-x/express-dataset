const Models = require('../database/database');
const Helpers = require('../helpers/auth');
const Utils = require('../helpers/sortByEventCount');
const anotherUtils = require('../helpers/sortByStreak');

const createActor = (req, res) => {
   const actor = {
	  name: req.body.name,
	  email: req.body.email,
	  avatar_url: 'default_avatar_url',
	  password: Helpers.hashPassword(req.body.password),
	  events: 0,
	  streaks: 0,
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

const signIn = (req, res) => {
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

const getAllActors = () => {
	
};

const updateActorAvatarUrl = (req, res) => {
	try {
		Models.actors.update({ _id: req.params.id }, { $set: { avatar_url: req.body.avatar_url } }, { multi: true }, (err, newlyUpdatedAvatarUrl) => {
			res.status(200).send({ message: 'Avatar Url updated' });
			return newlyUpdatedAvatarUrl;
		  });
	} catch (error) {
		res.status(500).send({ message: 'Something went wrong' });
	}

};

const getActorsByEventCount = (req, res) => {
	try {
		Models.actors.find({}, (err, actors) => {
		  Utils.sortByEventCount(actors) 
		  res.status(200).json(actors);
		  });
	  } catch (error) {
		  res.status(500).send({ message: 'Something went wrong' })
	  }
};


const getStreaks = (req, res) => {
    try {
		Models.actors.find({}, (err, actors) => {
		  anotherUtils.sortByStreak(actors) 
		  res.status(200).json(actors);
		  });
	  } catch (error) {
		  res.status(500).send({ message: 'Something went wrong' })
	  }
};


module.exports = {
	createActor: createActor,
	signIn: signIn,
	updateActorAvatarUrl: updateActorAvatarUrl,
	getAllActors: getAllActors,
	getStreaks: getStreaks,
	getActorsByEventCount: getActorsByEventCount
};

















