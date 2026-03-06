'use strict';

const { documentResponse, RESPONSE_DOC_KEY } = require('./responseDoc');

describe('documentResponse', () => {
  describe('middleware creation', () => {
    it('should create a pass-through middleware', () => {
      const middleware = documentResponse({
        200: { body: { message: 'OK' } }
      });
      
      expect(typeof middleware).toBe('function');
      expect(middleware.length).toBe(3); // req, res, next
    });

    it('should call next() when invoked', () => {
      const middleware = documentResponse({
        200: { body: { message: 'OK' } }
      });
      
      const next = jest.fn();
      middleware({}, {}, next);
      
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should attach response documentation metadata', () => {
      const responses = {
        201: { 
          description: 'Created',
          body: { id: 1 },
          headers: { 'X-Request-Id': 'uuid' }
        }
      };
      
      const middleware = documentResponse(responses);
      
      expect(middleware[RESPONSE_DOC_KEY]).toBeDefined();
      expect(middleware[RESPONSE_DOC_KEY][201]).toEqual({
        description: 'Created',
        body: { id: 1 },
        headers: { 'X-Request-Id': 'uuid' }
      });
    });
  });

  describe('input validation', () => {
    it('should throw error for null input', () => {
      expect(() => documentResponse(null)).toThrow('documentResponse requires a responses object');
    });

    it('should throw error for undefined input', () => {
      expect(() => documentResponse()).toThrow('documentResponse requires a responses object');
    });

    it('should throw error for non-object input', () => {
      expect(() => documentResponse('invalid')).toThrow('documentResponse requires a responses object');
    });

    it('should throw error for invalid status code (too low)', () => {
      expect(() => documentResponse({
        50: { body: {} }
      })).toThrow('Invalid status code: 50');
    });

    it('should throw error for invalid status code (too high)', () => {
      expect(() => documentResponse({
        600: { body: {} }
      })).toThrow('Invalid status code: 600');
    });

    it('should throw error for non-numeric status code', () => {
      expect(() => documentResponse({
        'invalid': { body: {} }
      })).toThrow('Invalid status code: invalid');
    });
  });

  describe('response configuration', () => {
    it('should handle string status codes', () => {
      const middleware = documentResponse({
        '200': { body: { ok: true } }
      });
      
      expect(middleware[RESPONSE_DOC_KEY][200]).toBeDefined();
      expect(middleware[RESPONSE_DOC_KEY][200].body).toEqual({ ok: true });
    });

    it('should default description to empty string', () => {
      const middleware = documentResponse({
        200: { body: { ok: true } }
      });
      
      expect(middleware[RESPONSE_DOC_KEY][200].description).toBe('');
    });

    it('should default headers to empty object', () => {
      const middleware = documentResponse({
        200: { body: { ok: true } }
      });
      
      expect(middleware[RESPONSE_DOC_KEY][200].headers).toEqual({});
    });

    it('should handle multiple status codes', () => {
      const middleware = documentResponse({
        200: { description: 'Success', body: { ok: true } },
        400: { description: 'Bad Request', body: { error: 'Invalid' } },
        404: { description: 'Not Found', body: { error: 'Not found' } },
        500: { description: 'Server Error', body: { error: 'Internal' } }
      });
      
      const meta = middleware[RESPONSE_DOC_KEY];
      expect(Object.keys(meta)).toHaveLength(4);
      expect(meta[200].description).toBe('Success');
      expect(meta[400].description).toBe('Bad Request');
      expect(meta[404].description).toBe('Not Found');
      expect(meta[500].description).toBe('Server Error');
    });

    it('should preserve body content exactly', () => {
      const complexBody = {
        data: {
          users: [
            { id: 1, name: 'John', roles: ['admin', 'user'] }
          ],
          pagination: {
            page: 1,
            total: 100
          }
        }
      };
      
      const middleware = documentResponse({
        200: { body: complexBody }
      });
      
      expect(middleware[RESPONSE_DOC_KEY][200].body).toEqual(complexBody);
    });

    it('should handle body with null value', () => {
      const middleware = documentResponse({
        204: { description: 'No Content', body: null }
      });
      
      expect(middleware[RESPONSE_DOC_KEY][204].body).toBeNull();
    });

    it('should handle body with undefined value', () => {
      const middleware = documentResponse({
        204: { description: 'No Content' }
      });
      
      expect(middleware[RESPONSE_DOC_KEY][204].body).toBeUndefined();
    });
  });

  describe('RESPONSE_DOC_KEY symbol', () => {
    it('should use global symbol', () => {
      expect(RESPONSE_DOC_KEY).toBe(Symbol.for('expressjs-field-validator:response-doc'));
    });

    it('should be consistent across imports', () => {
      const key1 = Symbol.for('expressjs-field-validator:response-doc');
      const key2 = Symbol.for('expressjs-field-validator:response-doc');
      expect(key1).toBe(key2);
      expect(key1).toBe(RESPONSE_DOC_KEY);
    });
  });
});
