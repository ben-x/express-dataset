var express = require('express');
var router = express.Router();
import { eraseEvents } from '../controllers/events';

// Route related to delete events
router.delete('/', eraseEvents);

module.exports = router;