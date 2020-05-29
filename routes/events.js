const express = require('express');
const router = express.Router();

const { getAllEvents, addEvent, getByActor } = require('../controllers/events');

// Routes related to event
router
  .route('/')
  .get(getAllEvents)
  .post(addEvent);

router.route('/actors/:id').get(getByActor);

module.exports = router;
