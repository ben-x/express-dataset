var express = require('express');
var router = express.Router();
const {findOne, insert, selectAll, findAll} = require('../db/dbQuery');

// Routes related to actor.
router.put('/',async(req,res)=>{
    try {
        let {id, login, avatar_url} = req.body;
        let sql = 'SELECT * FROM actor WHERE actor_id = ?';
        let params = [parseInt(id)];
        let result = await findOne(sql, params);
        if(typeof result === "undefined"){
            return res.status(404).send({});
        }

        let updateQuery = "UPDATE actor SET avatar_url = ? WHERE actor_id = ?"
        await insert(updateQuery,[avatar_url,parseInt(id)])
        res.status(200).send({});

    } catch (error) {
        console.log(error.message)
    }
})

router.get('/',async(req,res)=>{
    //get all actor
    try {
        let sql = "SELECT * FROM actor ORDER BY created_at DESC";
        let actors = await selectAll(sql);


        let result = actors.reduce(function (r, a) {
            r[a.login] = r[a.login] || [];
            r[a.login].push(a);
            return r;
        }, Object.create(null));


        let newActors = [];
        for (const [key, value] of Object.entries(result)) {
            let body = value[0];
            body.c = value.length;
            newActors.push(body)
        }

        //console.log(result)

        newActors.sort((a,b)=>{
            //time stamp to sort
            let aTs = Math.round(new Date(a.created_at).getTime()/1000)
            let bTs = Math.round(new Date(b.created_at).getTime()/1000)

            if(a.c < b.c){
                return 1
            }else if(a.c === b.c){
                if(aTs < bTs){
                    return 1
                }else if(aTs === bTs){
                    if(a.login < b.login){
                        return 1
                    }else{
                        return -1
                    }
                }else{
                    return -1
                }
            }else{
                return -1
            }
        })
        
        //clean result
        newActors.forEach(newActor => {
            delete newActor.created_at;
            delete newActor.event_id;
            delete newActor.c;
            newActor.id = newActor.actor_id;
            newActor.id = newActor.actor_id;
            newActor.login = newActor.login;
            newActor.avatar_url = newActor.avatar_url;
            delete newActor.actor_id;
        });
        res.status(200).send(newActors)
    } catch (error) {
        console.log(error.message)
    }

})


router.get('/streak',async(req,res)=>{
    //get all actors
    try {
        let sql = "SELECT * FROM actor ORDER BY created_at DESC";
        let actors = await selectAll(sql);

        actors.forEach(actor => {
            actor.created_at = actor.created_at.slice(0, -9);
        });


        let newActors = [];
        //group actors
        let result = actors.reduce(function (r, a) {
            r[a.login] = r[a.login] || [];
            r[a.login].push(a);
            return r;
        }, Object.create(null));

        //remove actors with thesame data
        for (const [key, value] of Object.entries(result)) {

            const filteredActors = value.reduce((acc, current) => {
                const x = acc.find(item => item.created_at === current.created_at);
                if (!x) {
                return acc.concat([current]);
                } else {
                return acc;
                }
            }, []);
            newActors.push(filteredActors);
        }


        //group new actors so i can count 
        let newActorsGroup = newActors.reduce(function (r, a) {
            r[a[0].login] = r[a[0].login] || [];
            r[a[0].login].push(a);
            return r;
        }, Object.create(null));

        //counting actors
        let newCountedActors = [];
        for (const [key, value] of Object.entries(newActorsGroup)) {
            let body = value[0][0];
            body.c = value[0].length;
            newCountedActors.push(body)
            // console.log(`${key}:${value[0]}`)
        }

        newCountedActors.sort((a,b)=>{
            //time stamp to sort
            let aTs = Math.round(new Date(a.created_at).getTime()/1000)
            let bTs = Math.round(new Date(b.created_at).getTime()/1000)

            if(a.c < b.c){
                return 1
            }else if(a.c === b.c){
                if(aTs < bTs){
                    return 1
                }else if(aTs === bTs){
                    if(a.login < b.login){
                        return 1
                    }else{
                        return -1
                    }
                }else{
                    return -1
                }
            }else{
                return -1
            }
        })

         //clean result
         newCountedActors.forEach(newCountedActor => {
            delete newCountedActor.created_at;
            delete newCountedActor.event_id;
            delete newCountedActor.c;
            newCountedActor.id = newCountedActor.actor_id;
            newCountedActor.login = newCountedActor.login;
            newCountedActor.avatar_url = newCountedActor.avatar_url;
            delete newCountedActor.actor_id;
        });

        res.status(200).send(newCountedActors)
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;