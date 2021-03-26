const db = require('./connection');
const util = require('util');
//db.get = util.promisify(db.get);


const selectAll = async (sql) => {

    return new Promise((resolve,reject)=>{

        db.all(sql, [], (err, rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
        // close the database connection
        //db.close();
    })
    
}

const insert = async (sql, data) => {

    return new Promise((resolve,reject)=>{

        db.run(sql, data, (err, rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
        // close the database connection
        //db.close();
    })
    
}

const findOne = async (sql, params) => {

    return new Promise((resolve,reject)=>{

        db.get(sql, params, (err, rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
        // close the database connection
        //db.close();
    })
    
}

const findAll = async (sql, params) => {

    return new Promise((resolve,reject)=>{

        db.all(sql, params, (err, rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
        // close the database connection
        //db.close();
    })
    
}

module.exports = {selectAll, insert, findOne, findAll}