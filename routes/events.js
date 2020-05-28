var express = require('express');
var router = express.Router();

// Routes related to event
router.get('/', (req, res) => {
	res.status(200).json({
		status: 'Success',
		message: 'Events route',
	});
});

module.exports = router;
