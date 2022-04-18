const { ValidationError } = require('sequelize');

/* eslint-disable no-unused-vars */
function logError(error, req, res, next) {
  console.log(error);
  next(error);
}
function errorHandler(error, req, res, next) {
  res.status(500).json({ error: error.message, body: '' });
}
function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }
  next(error);
}
function sequelizeErrorsHandler(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: error.name,
      errors: error.errors,
    });
  }
  next(error);
}
module.exports = {
  logError,
  errorHandler,
  boomErrorHandler,
  sequelizeErrorsHandler,
};
