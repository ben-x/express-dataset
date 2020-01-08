var express = require('express');
var router = express.Router();

// Route related to delete events
// Erasing all the events
router.delete("/", (req, res, next) => {
  res.json({
    "message": "Ok"
  })
});
module.exports = router;