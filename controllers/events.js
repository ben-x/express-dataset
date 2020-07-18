// const createError = require('http-errors');
const db = require('../db/db');
const { conflict, created } = require('../helpers/response');

var getAllEvents = () => {};

const addEvent = async (req, res, next) => {
  try {
    const { body } = req;
    const event = await db.findOne({ _id: body._id });

    if (event) {
      return conflict(res, 'Event already exist!!');
    }

    const newDoc = await db.insert(body);
    return created(res, newDoc);
  } catch (error) {
    return next(error);
  }
};

var getByActor = () => {};

var eraseEvents = () => {};

module.exports = {
  getAllEvents: getAllEvents,
  addEvent: addEvent,
  getByActor: getByActor,
  eraseEvents: eraseEvents,
};
