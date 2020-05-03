"use strict";

module.exports = (service) => {
  const servicefn = (req, res, next) => {
    if (req.locals.skipService)
      return next();
    
    return service(req, res, next);
  }
  return servicefn
}
