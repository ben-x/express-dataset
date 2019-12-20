const sqlite3 = require('sqlite3').verbose();
//Configuring and connecting to my database
let db = new sqlite3.Database('./database/riby_test_solution.db',
    (err)=>{
        if (err){
            console.log(err.message);
        }
        else{
            console.log('Connected to the database');
        }
        
    }
   
);
module.exports = db;
