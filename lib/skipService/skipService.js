'use strict';

module.exports = (req, statusCode) => {
  req.locals.skipService = true;
  req.locals.statusCode = statusCode;
};
