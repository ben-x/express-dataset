var express = require('express');
const { insert } = require('../db/dbQuery');
var router = express.Router();

// Route related to delete events
router.delete('/',async(req,res)=>{
    try {
        let sql = "DELETE FROM events"
        await insert(sql,[]);

        let actor = "DELETE FROM actor"
        await insert(actor,[]);

        let repo = "DELETE FROM repo"
        await insert(repo,[]);

        res.status(200).send({});
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;