const db = require('../db/db');
const { conflict, created, ok } = require('../helpers/response');

const getAllEvents = async (req, res, next) => {
  try {
    const events = await db.find({}).sort({ id: 1 }).exec();
    return ok(res, events);
  } catch (error) {
    return next(error);
  }
};

const addEvent = async (req, res, next) => {
  try {
    const { body } = req;
    const event = await db.findOne({ id: body.id });

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

const eraseEvents = async (req, res, next) => {
  try {
    const erasedCount = await db.remove({}, { multi: true });
    return ok(res, { message: `${erasedCount} event(s) erased!!!` });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllEvents: getAllEvents,
  addEvent: addEvent,
  getByActor: getByActor,
  eraseEvents: eraseEvents,
};
