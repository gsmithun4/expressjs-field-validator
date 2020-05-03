"use strict";

const checkService = (req, res, next, service) => {
  if (req.locals.skipService)
    return next();
  
  service(req, res, next);
}
module.exports = checkService;