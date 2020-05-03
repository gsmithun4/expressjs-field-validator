"use strict";

const checkService = (service) => {
  const servicefn = (req, res, next) => {
    if (req.locals.skipService)
      return next();
    
    return service(req, res, next);
  }
  return { servicefn }
}
module.exports = checkService.servicefn;