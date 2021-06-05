var neDB = require('nedb');

let getDB = (filename) => {
    return new neDB({ filename: filename, autoload: true });
}

module.exports = getDB