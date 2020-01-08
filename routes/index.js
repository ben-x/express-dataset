var express = require('express');
var router = express.Router();
const actor = require('./actor');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/', actor);

module.exports = router;
