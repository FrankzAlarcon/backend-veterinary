const boom = require('@hapi/boom');

function validationHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validation(data);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}
module.exports = validationHandler;
