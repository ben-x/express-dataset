var express = require('express');
var router = express.Router();

// Route related to delete events
router.get('/', (req, res) => {
	res.status(200).json({
		status: 'Success',
		message: 'eraseEvents route',
	});
});

module.exports = router;
