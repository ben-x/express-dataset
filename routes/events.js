var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../data-source/db')
// Routes related to event

router.post('/', (req, res) => {
    //let today = moment().format('YYYY-mm-DD hh:mm:ss')
    let body = req.body
    let eventObject = {
        _id: body.id,
        type: body.type,
        actor: {
            id: body.actor.id,
            login: body.actor.login,
            avatar_url: body.actor.avatar_url
        },
        repo: {
            id: body.repo.id,
            name: body.repo.name,
            url: body.repo.url
        },
        created_at: body.created_at
    }
    var events = db('events.db');
    events.insert(eventObject, (error, newDoc) => {
        if (error) {
            if (error.message.includes("it violates the unique constraint")) {
                return res.status(400).send({ status: 400 });
            }
        }
        return res.status(201).send({ status: 201 });
    });


})


module.exports = router;