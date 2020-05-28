var express = require('express');
var router = express.Router();

// Routes related to actor.
router.get('/', (req, res) => {
	res.status(200).json({
		status: 'Success',
		message: 'You hit the actors route!',
	});
	// res.render('actors', {title: 'Actors'});
});

module.exports = router;
