var express = require('express');
//import the database configuration
var db = require('../db.js');
var router = express.Router();

// Routes related to event
//Task number 1 Erasing all events
router.delete('/', (req, res, next) => {
    var sql ='delete from events';
    db.run(
        sql,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"All events have been deleted successfully"})
    });
})

//Task number 2 Adding new events
router.post('/', function(req, res, next) {

    // payload to be inserted into the database
    var data = {
        id: req.body.id,
        type: req.body.type,
        actor_id : req.body.actor_id,
        repo_id : req.body.repo_id,
        created_at  : req.body.created_at
        
    }

    //query statement
    var sql ='INSERT INTO events (id, type, actor_id,repo_id,created_at) VALUES (?,?,?,?,?)';

    // input parameters
    var params =[data.id, data.type, data.actor_id, data.repo_id, data.created_at];

    //execute the action
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "Actor records has been added to the database",
            "data": data,
        })
    });
  });

  //Task number 3 Returning all the events
  router.get('/', function(req, res, next) {

    //query statement
    var sql = 'select * from events order by id';
    var params = []
    db.all(sql,params,(err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
  })

module.exports = router;
