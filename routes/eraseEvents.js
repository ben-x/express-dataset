var express = require('express');
var router = express.Router();


var eventController = require('../controllers/events')


router.delete('/', eventController.eraseEvents)

module.exports = router;