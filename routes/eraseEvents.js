var express = require('express');
var router = express.Router();

const { eraseEvents } = require('../controllers/erase');

// Route related to delete events
router.route('/').delete(eraseEvents);

module.exports = router;
