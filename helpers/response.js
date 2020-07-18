const {
  OK,
  CONFLICT,
  CREATED,
  UNPROCESSABLE_ENTITY,
} = require('http-status-codes');

const conflict = (res, message) => {
  res.status(CONFLICT).json({
    status: CONFLICT,
    message,
  });
};

const created = (res, data) => {
  res.status(CREATED).json({
    status: CREATED,
    data,
  });
};

const unporecessed = (res, message) => {
  res.status(UNPROCESSABLE_ENTITY).json({
    status: UNPROCESSABLE_ENTITY,
    message,
  });
};

const ok = (res, message) => {
  res.status(OK).json({
    status: OK,
    message,
  });
};

module.exports = {
  conflict,
  created,
  unporecessed,
};
