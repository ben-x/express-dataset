var express = require('express');
const { eraseEvents } = require('../controllers/events');

var router = express.Router();

router.route('/').delete(eraseEvents);

module.exports = router;
