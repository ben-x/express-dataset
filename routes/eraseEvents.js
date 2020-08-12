var express = require('express');
var router = express.Router();
var { eraseEvents } = require('../controllers/events')

// Route related to delete events
router.delete('/', eraseEvents)
module.exports = router;