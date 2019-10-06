const Models = require('../database/database');

const checkEmail = (req, res, next) => {
  try {
    Models.actors.findOne({ email: req.body.email }, (err, actor) => {
      if(actor) {
        res.status(400).send({ message: 'This user id exists' })
      } else {
        return next();
      }
    });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
}

module.exports = {
  checkEmail: checkEmail
}