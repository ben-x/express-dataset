const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.SECRET;

var verifyToken = (req, res, next) => {
    try {
        const bearer = req.headers.authorization;
        if (!bearer) {
          res.status(401).send({ message: 'No token provided' });
        }
  
        const token = bearer.split(' ')[1];
        
        jwt.verify(token, SECRET, (err, decoded) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          }
  
          req.user = decoded;
          return next();
        });
      } catch (err) {
        return next(err);
      }
}

module.exports = {
    verifyToken: verifyToken
}