const express = require('express');
const router = express.Router();
const Events = require('../controllers/events')

// Route related to delete events
router.delete('/', Events.eraseEvents)

module.exports = router;