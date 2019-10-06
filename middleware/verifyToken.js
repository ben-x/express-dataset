const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.SECRET;

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
          res.status(401).send({ message: 'No token provided' });
        }
        
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