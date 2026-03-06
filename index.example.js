const checkService = require('./lib/checkService/checkService');
const skipService = require('./lib/skipService/skipService');
const { 
  validateBody,
  validateParam,
  validateQuery,
  validateHeader,
  param,
} = require('./lib/queryBuilder/queryBuilder');
const { generateDocs } = require('./lib/docGenerator/docGenerator');
const { documentResponse } = require('./lib/responseDoc/responseDoc');

module.exports = { 
  validateBody,
  validateParam,
  validateQuery, 
  validateHeader,
  param,
  checkService, 
  skipService,
  generateDocs,
  documentResponse
 };
