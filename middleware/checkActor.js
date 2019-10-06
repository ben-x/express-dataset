const Models = require('../database/database');

const checkActor = (req, res, next) => {
  try {
    Models.actors.findOne({ _id: req.params.id }, (err, actor) => {
      if(!actor) {
        res.status(404).send({ message: 'This Actor does not exist' })
      } else {
        return next();
      }
    });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
}

module.exports = {
  checkActor: checkActor
}