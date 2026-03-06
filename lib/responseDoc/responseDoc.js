'use strict';

/**
 * Symbol to mark response documentation middlewares
 */
const RESPONSE_DOC_KEY = Symbol.for('expressjs-field-validator:response-doc');

/**
 * Creates a middleware that documents API responses
 * This middleware is a pass-through that only attaches metadata for documentation generation
 * 
 * @param {Object} responses - Response documentation object
 * @param {Object} [responses.statusCode] - Response definition for a specific status code
 * @param {string} [responses.statusCode.description] - Description of the response
 * @param {Object} [responses.statusCode.body] - Sample response body
 * @param {Object} [responses.statusCode.headers] - Response headers
 * @returns {Function} Express middleware function with attached metadata
 * 
 * @example
 * app.post('/users',
 *   validateBody().isToBeRejected().addParams([...]),
 *   documentResponse({
 *     201: { 
 *       description: 'User created successfully',
 *       body: { message: 'User created', data: { id: 1, name: 'John' } },
 *       headers: { 'X-Request-Id': 'uuid' }
 *     },
 *     422: { 
 *       description: 'Validation failed',
 *       body: { error: 'Validation failed', details: [] }
 *     }
 *   }),
 *   handler
 * );
 */
const documentResponse = (responses) => {
  // Validate input
  if (!responses || typeof responses !== 'object') {
    throw new Error('documentResponse requires a responses object');
  }

  // Validate each response entry
  const validatedResponses = {};
  for (const [statusCode, config] of Object.entries(responses)) {
    const code = parseInt(statusCode, 10);
    if (isNaN(code) || code < 100 || code > 599) {
      throw new Error(`Invalid status code: ${statusCode}. Must be between 100 and 599.`);
    }

    validatedResponses[code] = {
      description: config.description || '',
      body: config.body,
      headers: config.headers || {}
    };
  }

  // Create pass-through middleware
  const middleware = (req, res, next) => {
    next();
  };

  // Attach response documentation metadata
  middleware[RESPONSE_DOC_KEY] = validatedResponses;

  return middleware;
};

module.exports = {
  documentResponse,
  RESPONSE_DOC_KEY
};
