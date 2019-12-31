const express = require('express');
const router = express.Router();
const controller = require('../controllers/events')

// Route related to delete events
router.delete('/', controller.eraseEvents)

module.exports = router;
