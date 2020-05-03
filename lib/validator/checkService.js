"use strict";

const checkService = (req, res, next) => {
  if (req.locals.skipService)
    return next();
}
module.exports = checkService;