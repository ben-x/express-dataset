const db = require('./connection');
const {selectAll, findOne} = require('./dbQuery');

let sql = `SELECT * FROM events`;


// selectAll(sql).then(answer=>{
//     console.log(answer)
// }).catch(err=>{
//     console.log(err)
// })

// (async()=>{
//     let res = await selectAll(sql);
//     console.log(res)
// })()

(async()=>{
    let checkIdSql = 'SELECT * FROM actor';
    let params = [12392];
    let data = await selectAll(checkIdSql);
    console.log([data, data.length])
})()

