'use strict';

/**
 * Symbol to mark response documentation middlewares
 */
const RESPONSE_DOC_KEY = Symbol.for('expressjs-field-validator:response-doc');

/**
 * Create a middleware that documents API responses.
 * This is a pass-through middleware that attaches response metadata for documentation generation.
 * Place it after validation middleware but before your route handler.
 * 
 * @param {Object} responses - Object mapping status codes to response configurations.
 * @param {string} [responses.statusCode.description] - Description of this response.
 * @param {*} [responses.statusCode.body] - Sample response body.
 * @param {Object.<string, string>} [responses.statusCode.headers] - Response headers.
 * @returns {Function} Express middleware function with attached metadata.
 * @throws {Error} If responses is not an object.
 * @throws {Error} If a status code is not a valid HTTP status code (100-599).
 * 
 * @example
 * const express = require('express');
 * const { validateBody, param, documentResponse } = require('expressjs-field-validator');
 * 
 * const app = express();
 * 
 * app.post('/users',
 *   validateBody().isToBeRejected().addParams([
 *     param('name').isRequired(),
 *     param('email').isRequired().isEmail(),
 *   ]),
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
 *   (req, res) => res.status(201).send({ message: 'User created' })
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
