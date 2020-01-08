const express = require('express');
const router = express.Router();
const actor = require('./actor');
const events = require('./events')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/', actor);
router.use('/', events);

module.exports = router;
