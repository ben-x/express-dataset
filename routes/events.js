const express = require('express');
const { addEvent, getAllEvents } = require('../controllers/events');
const { addEventValidation } = require('../middleware/validation');

const router = express.Router();

router.post('/', addEventValidation, addEvent);
router.get('/', getAllEvents);

module.exports = router;
