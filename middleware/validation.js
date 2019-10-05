const expressValidator = require("express-validator");
const { Actor, Event } = require("../models");

const { check, validationResult } = expressValidator;

const returnValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
    .array()
    .map(error => error.msg);
  if (!errors.length) return next();
  return res.status(422).json({ errors });
};

const validateEvent = [
  check("type")
    .isString()
    .withMessage("Please login should contain letters"),

  check("actor.login")
    .isString()
    .withMessage("Please login should contain letters"),

  check("actor.avatar_url")
    .isURL()
    .withMessage("Avatar url must be a valid url"),

  check("repo.name")
    .isString()
    .withMessage("Please name should contain letters"),

  check("repo.url")
    .isURL()
    .withMessage("url must be a valid url")
];

module.exports = {
  returnValidationErrors,
  validateEvent
};
