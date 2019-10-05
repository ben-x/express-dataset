const path = require('path');
require('dotenv').config();


const config = {
  development: {
    dialect: 'sqlite',
    storage:  path.join(__dirname, './database.sqlite')
  },
  test: {
    host: process.env.DB_HOST,
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
  },
  
};

module.exports = config;
