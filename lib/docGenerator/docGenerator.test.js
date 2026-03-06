'use strict';

const {
  generateDocs,
  extractRoutes,
  formatValidationRules,
  attachMeta,
  VALIDATION_META_KEY
} = require('./docGenerator');
const { RESPONSE_DOC_KEY } = require('../responseDoc/responseDoc');
const fs = require('fs');
const path = require('path');

// Mock Express app
const createMockApp = (routes = []) => {
  const stack = routes.map(route => ({
    route: {
      path: route.path,
      methods: route.methods.reduce((acc, m) => ({ ...acc, [m]: true }), {}),
      stack: route.middlewares.map(mw => ({ handle: mw }))
    }
  }));
  
  return {
    _router: { stack }
  };
};

// Create middleware with validation metadata
const createValidationMiddleware = (location, validation, response = {}) => {
  const middleware = (req, res, next) => next();
  middleware[VALIDATION_META_KEY] = { location, validation, response };
  return middleware;
};

describe('docGenerator', () => {
  const testOutputDir = path.join(__dirname, '../../test-docs-output');
  
  beforeEach(() => {
    // Clean up test output directory
    if (fs.existsSync(testOutputDir)) {
      fs.rmSync(testOutputDir, { recursive: true });
    }
  });
  
  afterAll(() => {
    // Clean up after all tests
    if (fs.existsSync(testOutputDir)) {
      fs.rmSync(testOutputDir, { recursive: true });
    }
  });

  describe('extractRoutes', () => {
    test('extracts routes with validation metadata', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'name', isRequired: true },
        { param: 'email', isEmail: true }
      ], { mode: 'reject' });
      
      const app = createMockApp([
        {
          path: '/users',
          methods: ['post'],
          middlewares: [bodyMiddleware]
        }
      ]);
      
      const routes = extractRoutes(app);
      
      expect(routes).toHaveLength(1);
      expect(routes[0].path).toBe('/users');
      expect(routes[0].methods).toEqual(['POST']);
      expect(routes[0].validations.body).toBeDefined();
      expect(routes[0].validations.body.validation).toHaveLength(2);
    });
    
    test('extracts multiple validation locations', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'data', isRequired: true }
      ]);
      const queryMiddleware = createValidationMiddleware('query', [
        { param: 'page', isNumber: true }
      ]);
      
      const app = createMockApp([
        {
          path: '/items',
          methods: ['get'],
          middlewares: [bodyMiddleware, queryMiddleware]
        }
      ]);
      
      const routes = extractRoutes(app);
      
      expect(routes).toHaveLength(1);
      expect(routes[0].validations.body).toBeDefined();
      expect(routes[0].validations.query).toBeDefined();
    });
    
    test('ignores routes without validation middleware', () => {
      const regularMiddleware = (req, res, next) => next();
      
      const app = createMockApp([
        {
          path: '/health',
          methods: ['get'],
          middlewares: [regularMiddleware]
        }
      ]);
      
      const routes = extractRoutes(app);
      
      expect(routes).toHaveLength(0);
    });
    
    test('returns empty array for app without router', () => {
      const app = {};
      const routes = extractRoutes(app);
      expect(routes).toEqual([]);
    });
    
    test('returns empty array for app with empty router stack', () => {
      const app = { _router: { stack: [] } };
      const routes = extractRoutes(app);
      expect(routes).toEqual([]);
    });
  });

  describe('formatValidationRules', () => {
    test('formats basic field info', () => {
      const validation = [
        { param: 'name', isRequired: true }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted).toHaveLength(1);
      expect(formatted[0].name).toBe('name');
      expect(formatted[0].required).toBe(true);
      expect(formatted[0].type).toBe('string');
    });
    
    test('identifies field types correctly', () => {
      const validation = [
        { param: 'count', isNumber: true },
        { param: 'active', isBoolean: true },
        { param: 'email', isEmail: true },
        { param: 'date', isDate: true },
        { param: 'items', isArray: true },
        { param: 'meta', isObject: true },
        { param: 'phone', mobileNumber: {} }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].type).toBe('number');
      expect(formatted[1].type).toBe('boolean');
      expect(formatted[2].type).toBe('email');
      expect(formatted[3].type).toBe('date');
      expect(formatted[4].type).toBe('array');
      expect(formatted[5].type).toBe('object');
      expect(formatted[6].type).toBe('mobile');
    });
    
    test('extracts constraints', () => {
      const validation = [
        { 
          param: 'price', 
          isNumber: true,
          range: { min: 1, max: 100 },
          defaultValue: 10
        }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].constraints).toContain('Min value: 1');
      expect(formatted[0].constraints).toContain('Max value: 100');
      expect(formatted[0].constraints).toContain('Default: 10');
    });
    
    test('extracts length constraints', () => {
      const validation = [
        { param: 'name', length: { min: 2, max: 50 } }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].constraints).toContain('Min length: 2');
      expect(formatted[0].constraints).toContain('Max length: 50');
    });
    
    test('extracts includes/excludes', () => {
      const validation = [
        { param: 'status', includes: ['active', 'inactive'] },
        { param: 'type', excludes: ['spam', 'test'] }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].constraints).toContain('Allowed values: active, inactive');
      expect(formatted[1].constraints).toContain('Excluded values: spam, test');
    });
    
    test('extracts date format and conversion', () => {
      const validation = [
        { param: 'date', isDate: true, format: 'DD/MM/YYYY', convertToFormat: 'YYYY-MM-DD' }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].constraints).toContain('Date format: DD/MM/YYYY');
      expect(formatted[0].constraints).toContain('Converts to: YYYY-MM-DD');
    });
    
    test('extracts mobile number options', () => {
      const validation = [
        { param: 'phone', mobileNumber: { countryCode: '91', isCountryCodeMandatory: true } }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].constraints.some(c => c.includes('+91'))).toBe(true);
      expect(formatted[0].constraints.some(c => c.includes('required'))).toBe(true);
    });
    
    test('extracts removeIfEmpty', () => {
      const validation = [
        { param: 'bio', removeIfEmpty: true }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].constraints).toContain('Removed if empty');
    });
    
    test('extracts custom error message', () => {
      const validation = [
        { param: 'email', message: 'Please provide a valid email' }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].constraints).toContain('Error: "Please provide a valid email"');
    });
    
    test('extracts custom validator flag', () => {
      const validation = [
        { param: 'code', customValidator: () => {} }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].constraints).toContain('Custom validation');
    });
    
    test('handles nested children', () => {
      const validation = [
        { 
          param: 'address', 
          isObject: true,
          children: [
            { param: 'street', isRequired: true },
            { param: 'city', isRequired: true }
          ]
        }
      ];
      
      const formatted = formatValidationRules(validation);
      
      expect(formatted[0].children).toHaveLength(2);
      expect(formatted[0].children[0].name).toBe('street');
      expect(formatted[0].children[1].name).toBe('city');
    });
    
    test('returns empty array for invalid input', () => {
      expect(formatValidationRules(null)).toEqual([]);
      expect(formatValidationRules(undefined)).toEqual([]);
      expect(formatValidationRules('invalid')).toEqual([]);
    });
  });

  describe('generateDocs', () => {
    test('generates HTML documentation file', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'name', isRequired: true },
        { param: 'email', isEmail: true }
      ], { mode: 'reject', errorCode: 422 });
      
      const app = createMockApp([
        {
          path: '/users',
          methods: ['post'],
          middlewares: [bodyMiddleware]
        }
      ]);
      
      const result = generateDocs(app, {
        outputDir: testOutputDir,
        title: 'Test API',
        version: '1.0.0'
      });
      
      expect(result.routes).toHaveLength(1);
      expect(result.outputPath).toBeDefined();
      expect(fs.existsSync(result.outputPath)).toBe(true);
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('Test API');
      expect(content).toContain('1.0.0');
      expect(content).toContain('/users');
      expect(content).toContain('POST');
      expect(content).toContain('name');
      expect(content).toContain('email');
    });
    
    test('returns null outputPath when no routes found', () => {
      const app = createMockApp([]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      expect(result.routes).toHaveLength(0);
      expect(result.outputPath).toBeNull();
    });
    
    test('creates output directory if not exists', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'test' }
      ]);
      
      const app = createMockApp([
        { path: '/test', methods: ['get'], middlewares: [bodyMiddleware] }
      ]);
      
      const nestedDir = path.join(testOutputDir, 'nested', 'path');
      
      const result = generateDocs(app, { outputDir: nestedDir });
      
      expect(fs.existsSync(nestedDir)).toBe(true);
      expect(fs.existsSync(result.outputPath)).toBe(true);
    });
    
    test('uses default options', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'data' }
      ]);
      
      const app = createMockApp([
        { path: '/data', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      // Override outputDir to use test directory
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      expect(result.outputPath).toContain('api-docs.html');
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('API Documentation');
    });
    
    test('includes response config in documentation', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'name' }
      ], { mode: 'forward', errorCode: 400, cleanUp: true, removeIfEmpty: true });
      
      const app = createMockApp([
        { path: '/test', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('Forward');
      expect(content).toContain('400');
    });
    
    test('handles multiple HTTP methods', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'data' }
      ]);
      
      const app = createMockApp([
        { path: '/items', methods: ['get', 'post', 'put', 'delete'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('GET');
      expect(content).toContain('POST');
      expect(content).toContain('PUT');
      expect(content).toContain('DELETE');
    });
    
    test('custom filename option', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'test' }
      ]);
      
      const app = createMockApp([
        { path: '/test', methods: ['get'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, {
        outputDir: testOutputDir,
        filename: 'custom-docs.html'
      });
      
      expect(result.outputPath).toContain('custom-docs.html');
      expect(fs.existsSync(result.outputPath)).toBe(true);
    });

    test('renders nested children fields', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { 
          param: 'address', 
          isObject: true,
          isRequired: true,
          children: [
            { param: 'street', isRequired: true },
            { param: 'city', isRequired: true },
            { param: 'zip', length: { min: 5, max: 10 } }
          ]
        }
      ]);
      
      const app = createMockApp([
        { path: '/orders', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('address');
      expect(content).toContain('street');
      expect(content).toContain('city');
      expect(content).toContain('zip');
      expect(content).toContain('field-children');
    });

    test('renders response documentation with all status code colors', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'data' }
      ]);
      
      // Create middleware with response docs
      const responseDocMiddleware = (req, res, next) => next();
      responseDocMiddleware[RESPONSE_DOC_KEY] = {
        200: { description: 'Success', body: { ok: true } },
        201: { description: 'Created', body: { id: 1 }, headers: { 'X-Request-Id': 'uuid-123' } },
        301: { description: 'Moved Permanently' },
        400: { description: 'Bad Request', body: { error: 'Invalid' } },
        404: { description: 'Not Found' },
        500: { description: 'Server Error', body: { error: 'Internal' } }
      };
      
      const app = createMockApp([
        { path: '/test', methods: ['post'], middlewares: [bodyMiddleware, responseDocMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      // Check status codes
      expect(content).toContain('200');
      expect(content).toContain('201');
      expect(content).toContain('301');
      expect(content).toContain('400');
      expect(content).toContain('404');
      expect(content).toContain('500');
      // Check descriptions
      expect(content).toContain('Success');
      expect(content).toContain('Created');
      expect(content).toContain('Bad Request');
      expect(content).toContain('Server Error');
      // Check response headers
      expect(content).toContain('X-Request-Id');
      expect(content).toContain('uuid-123');
      // Check colors (2xx green, 3xx orange, 4xx red, 5xx purple)
      expect(content).toContain('#49cc90'); // 2xx green
      expect(content).toContain('#fca130'); // 3xx orange
      expect(content).toContain('#f93e3e'); // 4xx red
      expect(content).toContain('#9012fe'); // 5xx purple
    });

    test('renders response doc without body or headers', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'data' }
      ]);
      
      const responseDocMiddleware = (req, res, next) => next();
      responseDocMiddleware[RESPONSE_DOC_KEY] = {
        204: { description: 'No Content' }
      };
      
      const app = createMockApp([
        { path: '/delete', methods: ['delete'], middlewares: [bodyMiddleware, responseDocMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('204');
      expect(content).toContain('No Content');
    });

    test('extracts routes with only responseDoc (no validation)', () => {
      const responseDocMiddleware = (req, res, next) => next();
      responseDocMiddleware[RESPONSE_DOC_KEY] = {
        200: { description: 'OK', body: { status: 'healthy' } }
      };
      
      const app = createMockApp([
        { path: '/health', methods: ['get'], middlewares: [responseDocMiddleware] }
      ]);
      
      const routes = extractRoutes(app);
      
      expect(routes).toHaveLength(1);
      expect(routes[0].path).toBe('/health');
      expect(routes[0].responseDoc).toBeDefined();
      expect(routes[0].responseDoc[200].description).toBe('OK');
    });

    test('handles unknown status code color (1xx)', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'data' }
      ]);
      
      const responseDocMiddleware = (req, res, next) => next();
      responseDocMiddleware[RESPONSE_DOC_KEY] = {
        100: { description: 'Continue' }
      };
      
      const app = createMockApp([
        { path: '/stream', methods: ['post'], middlewares: [bodyMiddleware, responseDocMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('100');
      expect(content).toContain('Continue');
      expect(content).toContain('#999'); // Default color for unknown
    });
  });

  describe('attachMeta', () => {
    test('attaches metadata to middleware function', () => {
      const middleware = (req, res, next) => next();
      const location = 'body';
      const validation = [{ param: 'name', isRequired: true }];
      const response = { mode: 'reject', errorCode: 422 };
      
      const result = attachMeta(middleware, location, validation, response);
      
      expect(result).toBe(middleware);
      expect(result[VALIDATION_META_KEY]).toBeDefined();
      expect(result[VALIDATION_META_KEY].location).toBe('body');
      expect(result[VALIDATION_META_KEY].validation).toEqual(validation);
      expect(result[VALIDATION_META_KEY].response).toEqual(response);
    });

    test('returns the same middleware function', () => {
      const middleware = (req, res, next) => next();
      const result = attachMeta(middleware, 'query', [], {});
      
      expect(result).toBe(middleware);
    });
  });

  describe('extractRoutes with Express Router', () => {
    test('extracts routes from nested Express Router', () => {
      // Simulate Express Router middleware
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'username', isRequired: true }
      ]);
      
      // Create a mock router with its own stack
      const routerStack = [
        {
          route: {
            path: '/profile',
            methods: { get: true },
            stack: [{ handle: bodyMiddleware }]
          }
        }
      ];
      
      const routerMiddleware = {
        name: 'router',
        regexp: /^\/api\/users\/?(?=\/|$)/,
        handle: { stack: routerStack }
      };
      
      const app = {
        _router: {
          stack: [routerMiddleware]
        }
      };
      
      const routes = extractRoutes(app);
      
      expect(routes).toHaveLength(1);
      expect(routes[0].path).toContain('/profile');
    });

    test('handles router without regexp', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'data' }
      ]);
      
      const routerMiddleware = {
        name: 'router',
        handle: { 
          stack: [
            {
              route: {
                path: '/items',
                methods: { get: true },
                stack: [{ handle: bodyMiddleware }]
              }
            }
          ]
        }
      };
      
      const app = {
        _router: {
          stack: [routerMiddleware]
        }
      };
      
      const routes = extractRoutes(app);
      
      expect(routes).toHaveLength(1);
      expect(routes[0].path).toBe('/items');
    });
  });

  describe('sample request body generation', () => {
    test('generates sample body with copy button', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'name', isRequired: true },
        { param: 'email', isEmail: true },
        { param: 'age', isNumber: true }
      ]);
      
      const app = createMockApp([
        { path: '/users', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('sample-section');
      expect(content).toContain('copy-btn');
      expect(content).toContain('copyText');
      expect(content).toContain('&quot;foo&quot;'); // Default string value (HTML escaped)
      expect(content).toContain('100'); // Default number value
      expect(content).toContain('user@example.com'); // Email value
    });

    test('generates sample with default values', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'status', defaultValue: 'active' },
        { param: 'count', isNumber: true, defaultValue: 5 }
      ]);
      
      const app = createMockApp([
        { path: '/items', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('&quot;active&quot;');
      expect(content).toContain('5');
    });

    test('generates sample with includes values', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'type', includes: ['online', 'offline', 'hybrid'] }
      ]);
      
      const app = createMockApp([
        { path: '/events', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('&quot;online&quot;'); // Should use first allowed value
    });

    test('generates sample with nested objects', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { 
          param: 'address', 
          isObject: true,
          children: [
            { param: 'street' },
            { param: 'zip', isNumber: true }
          ]
        }
      ]);
      
      const app = createMockApp([
        { path: '/orders', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('&quot;address&quot;');
      expect(content).toContain('&quot;street&quot;');
      expect(content).toContain('&quot;zip&quot;');
    });

    test('generates sample with array of objects', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { 
          param: 'items', 
          isArray: true,
          children: [
            {
              param: 'item',
              children: [
                { param: 'name' },
                { param: 'qty', isNumber: true }
              ]
            }
          ]
        }
      ]);
      
      const app = createMockApp([
        { path: '/cart', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('&quot;items&quot;');
    });

    test('includes GitHub link in footer', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'data' }
      ]);
      
      const app = createMockApp([
        { path: '/test', methods: ['get'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('https://github.com/gsmithun4/expressjs-field-validator');
      expect(content).toContain('GitHub');
    });

    test('generates cURL command with all options', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'name', isRequired: true }
      ]);
      const queryMiddleware = createValidationMiddleware('query', [
        { param: 'page', isNumber: true }
      ]);
      const headersMiddleware = createValidationMiddleware('headers', [
        { param: 'authorization' }
      ]);
      
      const app = createMockApp([
        { path: '/users', methods: ['post'], middlewares: [bodyMiddleware, queryMiddleware, headersMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('cURL');
      expect(content).toContain('curl');
      expect(content).toContain('-X POST');
      expect(content).toContain('-H');
      expect(content).toContain('Content-Type: application/json');
      expect(content).toContain('-d');
    });

    test('generates query string format in sample panel', () => {
      const queryMiddleware = createValidationMiddleware('query', [
        { param: 'page', isNumber: true },
        { param: 'sort' }
      ]);
      
      const app = createMockApp([
        { path: '/items', methods: ['get'], middlewares: [queryMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('Query String');
      expect(content).toContain('page=100');
      expect(content).toContain('sort=foo');
    });

    test('renders sidebar with endpoint list', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'data' }
      ]);
      
      const app = createMockApp([
        { path: '/users', methods: ['get'], middlewares: [bodyMiddleware] },
        { path: '/posts', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('sidebar');
      expect(content).toContain('sidebar-item');
      expect(content).toContain('selectRoute');
      expect(content).toContain('/users');
      expect(content).toContain('/posts');
    });

    test('renders three-panel layout', () => {
      const bodyMiddleware = createValidationMiddleware('body', [
        { param: 'name' }
      ]);
      
      const app = createMockApp([
        { path: '/test', methods: ['post'], middlewares: [bodyMiddleware] }
      ]);
      
      const result = generateDocs(app, { outputDir: testOutputDir });
      
      const content = fs.readFileSync(result.outputPath, 'utf8');
      expect(content).toContain('main-container');
      expect(content).toContain('details-panel');
      expect(content).toContain('sample-panel');
    });
  });
});