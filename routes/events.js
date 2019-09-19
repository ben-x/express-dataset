var express = require('express');
var router = express.Router();
import { addEvent, getAllEvents, getByActor } from '../controllers/events';

// Routes related to event
router.post('/', addEvent);
router.get('/', getAllEvents);
router.get('/actors/:id', getByActor);


module.exports = router;
