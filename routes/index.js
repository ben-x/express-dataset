const express = require('express');
const router = express.Router();
const actor = require('./actor');
const events = require('./events')
const eraseEvents = require('./eraseEvents');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/', actor);
router.use('/', events);
router.use('/', eraseEvents);

module.exports = router;
