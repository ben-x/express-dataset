var express = require('express');
var router = express.Router(); 
var Actors = require('../controllers/actors');
var Actor = require('../middleware/checkEmail');
var ActorExistence = require('../middleware/checkActor');
var Auth = require('../middleware/verifyToken');
const Identity = require('../middleware/checkIfOwner');
var Validator = require('../validation/actorInputValidator');
var urlValidator = require('../validation/avatarUrlValidator');

// Routes related to actor.
router.post('/signup', Validator.actorInputValidator, Actor.checkEmail, Actors.createActor);
router.post('/signin', Validator.actorInputValidator, Actors.signIn);
router.put('/:id', Auth.verifyToken, ActorExistence.checkActor, Identity.checkIfOwner, urlValidator.avatarUrlValidator, Actors.updateActorAvatarUrl);
module.exports = router;