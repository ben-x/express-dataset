var express = require('express');
var router = express.Router();
const { insert, selectAll, findOne } = require('../db/dbQuery');

//setting time zone
process.env.TZ = 'Europe/Amsterdam'

// Routes related to event
router.post('/', async (req, res) => {

    try {
        let { id, type, actor, repo, created_at } = req.body;

        //check if ID already exist
        let checkIdSql = 'SELECT * FROM events WHERE id = ?';
        let params = [id];
        let data = await findOne(checkIdSql, params);

        if (typeof data !== "undefined") {
            return res.status(400).send();
        }
        //insert into events table
        let insertEvent = 'INSERT INTO events (id, type, created_at) VALUES(?, ?, ?)';
        let body = [
            id,
            type,
            created_at
        ];
        await insert(insertEvent, body);

        //insert actions
        let insertActions = 'INSERT INTO actor (actor_id, login, avatar_url, created_at, event_id) VALUES(?, ?, ?, ?, ?)';
        let body1 = [
            actor.id,
            actor.login,
            actor.avatar_url,
            created_at,
            id
        ];
        await insert(insertActions, body1);

        //insert repo
        let insertRepo = 'INSERT INTO repo (repo_id, name, url, event_id) VALUES(?, ?, ?, ?)';
        let body2 = [
            repo.id,
            repo.name,
            repo.url,
            id
        ];
        await insert(insertRepo, body2);


        res.status(201).send();
    } catch (error) {
        console.log(error.message)
    }

})

router.get('/', async (req, res) => {

    try {
        let result = [];

        let checkIdSql = 'SELECT * FROM events INNER JOIN actor ON events.id = actor.event_id INNER JOIN repo ON events.id = repo.event_id ORDER BY id ASC';
        let data = await selectAll(checkIdSql);

        if (data.length > 0) {
            data.forEach(element => {
                let res = {
                    id: element.id,
                    type: element.type,
                    actor: {
                        id: element.actor_id,
                        login: element.login,
                        avatar_url: element.avatar_url
                    },
                    repo: {
                        id: element.repo_id,
                        name: element.name,
                        url: element.url
                    },
                    created_at: element.created_at
                }
                result.push(res)
            });
        }

        res.status(200).send(result);
    } catch (error) {
        console.log(error.message)
    }

})

router.get('/actors/:actorID', async(req, res) => {
    try {
        let { actorID } = req.params;

        let result = [];

        let checkIdSql = 'SELECT * FROM events INNER JOIN actor ON events.id = actor.event_id INNER JOIN repo ON events.id = repo.event_id ORDER BY id ASC';
        let data = await selectAll(checkIdSql);

        let newData = data.filter(datum=>datum.actor_id === parseInt(actorID));

        if (newData.length === 0) {
            return res.status(404).send([])
        }
        newData.forEach(element => {
            let res = {
                id: element.id,
                type: element.type,
                actor: {
                    id: element.actor_id,
                    login: element.login,
                    avatar_url: element.avatar_url
                },
                repo: {
                    id: element.repo_id,
                    name: element.name,
                    url: element.url
                },
                created_at: element.created_at
            }
            result.push(res)
        });

        res.status(200).send(result);
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;