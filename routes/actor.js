var express = require('express');
var router = express.Router(); 
var Actors = require('../controllers/actors');
var Actor = require('../middleware/checkEmail');
var Validator = require('../validation/actorInputValidator');

// Routes related to actor.
router.post('/signup', Validator.actorInputValidator, Actor.checkEmail, Actors.createActor);
router.post('/signin', Validator.actorInputValidator, Actors.signIn);
module.exports = router;