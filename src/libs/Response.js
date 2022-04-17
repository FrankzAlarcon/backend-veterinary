/* eslint-disable class-methods-use-this */
class Response {
  success(res, message, statusCode = 200) {
    res.status(statusCode).json({ error: '', body: message });
  }
}

module.exports = Response;
