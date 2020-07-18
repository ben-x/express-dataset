const express = require('express');
const { addEvent } = require('../controllers/events');
const { addEventValidation } = require('../middleware/validation');

const router = express.Router();

router.post('/', addEventValidation, addEvent);

module.exports = router;
