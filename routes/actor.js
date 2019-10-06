var express = require('express');
var router = express.Router(); 
var Actors = require('../controllers/actors');
var Actor = require('../middleware/checkEmail');
var Validator = require('../validation/newActorValidator');

// Routes related to actor.
router.post('/', Validator.newActorValidator, Actor.checkEmail, Actors.createActor);

module.exports = router;