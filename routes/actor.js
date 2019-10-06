const express = require('express');
const router = express.Router(); 
const Actors = require('../controllers/actors');
const Actor = require('../middleware/checkEmail');
const ActorExistence = require('../middleware/checkActor');
const Auth = require('../middleware/verifyToken');
const Identity = require('../middleware/checkIfOwner');
const Validator = require('../validation/actorInputValidator');
const urlValidator = require('../validation/avatarUrlValidator');

// Routes related to actor.
router.post('/signup', Validator.actorInputValidator, Actor.checkEmail, Actors.createActor);
router.post('/signin', Validator.actorInputValidator, Actors.signIn);
router.put('/:id', Auth.verifyToken, ActorExistence.checkActor, Identity.checkIfOwner, urlValidator.avatarUrlValidator, Actors.updateActorAvatarUrl);
router.get('/', Actors.getActorsByEventCount);
router.get('/streak', Actors.getStreaks);
module.exports = router;