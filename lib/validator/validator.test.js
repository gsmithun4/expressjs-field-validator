const validaor = require('./validator');

const next = jest.fn();
const resp = {
  status: jest.fn(()=>resp),
  send: jest.fn(()=>resp)
};

describe('Test for body params', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Boolean', () => {
    test('Test nested objects Success case - Boolean test', () => {
      const req = {
        body: {
          page: {
            sorted: 'True'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - Boolean test', () => {
      const req = {
        body: {
          page: {
            sorted: 'error-string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Success case - Boolean test - path params', () => {
      const req = {
        params: {
          page: true
        }
      };    
      const validation = [
        {param : 'page', location : 'params', isRequired : true, isBoolean : true}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('params', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - Boolean test - path params', () => {
      const req = {
        params: {
          page: {
            sorted: 'error-string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'params', isRequired : true, isBoolean : true}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('params', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'params',
            message: 'Invalid Field Error',
            param: 'page',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Required test - path params', () => {
      const req = {
        params: {}
      };    
      const validation = [
        {param : 'page', location : 'params', isRequired : true, isBoolean : true}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('params', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'params',
            message: 'Invalid Field Error',
            param: 'page',
          }
        ]
      });
    });
  
    test('Test nested objects Success case - Boolean test - path query', () => {
      const req = {
        query: {
          page: true
        }
      };    
      const validation = [
        {param : 'page', location : 'query', isRequired : true, isBoolean : true}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('query', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - Boolean test - path query', () => {
      const req = {
        query: {
          page: {
            sorted: 'error-string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'query', isRequired : true, isBoolean : true}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('query', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'query',
            message: 'Invalid Field Error',
            param: 'page',
          }
        ]
      });
    });
  
    test('Test nested objects Success case - Boolean test - path locals', () => {
      const req = {
        locals: {
          page: true
        }
      };    
      const validation = [
        {param : 'page', location : 'locals', isRequired : true, isBoolean : true}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('locals', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - Boolean test - path locals', () => {
      const req = {
        locals: {
          page: {
            sorted: 'error-string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'locals', isRequired : true, isBoolean : true}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('locals', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'locals',
            message: 'Invalid Field Error',
            param: 'page',
          }
        ]
      });
    });
  });

  

  test('Test nested objects Error case - Mode test forward', () => {
    const req = {
      body: {
        page: {
          sorted: 'error-string'
        }
      },
      locals: {}
    };    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
      ]}
    ];
    const response = {
      mode: 'forward'
    };
    const validatorfn = validaor('body', validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0);
    expect(req.locals.statusCode).toEqual(422);
    expect(req.locals.skipService).toEqual(true);
    expect(req.locals.data).toEqual({
      error: [
        {
          location: 'body',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    });
  });

  describe('Error code/ status code test on failure', () => {
    test('Test nested objects Error case - Status code test', () => {
      const req = {
        body: {
          page: {
            sorted: 'error-string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledWith(422);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Predefined Status code test', () => {
      const req = {
        body: {
          page: {
            sorted: 'error-string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
        ]}
      ];
      const response = {
        mode: 'reject',
        errorCode: 400
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledWith(400);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Predefined error message', () => {
      const req = {
        body: {
          page: {
            sorted: 'error-string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true, message:'Mandatory field sorted missing'},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Mandatory field sorted missing',
            param: 'sorted',
          }
        ]
      });
    });
  });

  describe('isRequired test', () => {
    test('Test nested objects Error case - Required Test', () => {
      const req = {
        body: {
          page: {
            sorted: 'error-string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isBoolean : true},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Success case - Required Test 2', () => {
      const req = {
        body: {
          page: {}
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isBoolean : true},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('isNumber test', () => {
    test('Test nested objects Success case - Number test', () => {
      const req = {
        body: {
          page: {
            sorted: '5'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true, range: { min: 2, max: 9 } },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
    
    test('Test nested objects Error case - Number test', () => {
      const req = {
        body: {
          page: {
            sorted: 'error-string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Success case - Number test zero', () => {
      const req = {
        body: {
          page: {
            sorted: '0'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Success case - Number test zero number', () => {
      const req = {
        body: {
          page: {
            sorted: 0
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Success case - Number test - Range', () => {
      const req = {
        body: {
          page: {
            sorted: 2
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true, range: { min: 2, max: 9 } },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - Number test - Range', () => {
      const req = {
        body: {
          page: {
            sorted: 10
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true, range: { min: 2, max: 9 } },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Number test - Range min', () => {
      const req = {
        body: {
          page: {
            sorted: 1
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true, range: { min: 2, max: 9 } },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  });
  
  describe('customValidator test', () => {
    test('Test error case - customValidator not a function', () => {
      const req = {
        body: {
          page: {
            sorted: 100
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isNumber : true, customValidator: 'not-a-function'},
        ]}
      ];
      const response = {
        mode: 'reject',
        debug: true,
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error :: 100 : Error: Configured customValidator is not a function',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test error case - customValidator calls error', () => {
      const req = {
        body: {
          page: {
            sorted: 101
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isNumber : true, customValidator: (value, req, error) => {
              if (value !== 100) {
                error('Invalid value customValidator');
              }
            }},
        ]}
      ];
      const response = {
        mode: 'reject',
        debug: true,
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error :: 101 : Error: Invalid value customValidator',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Success case - customValidator', () => {
      const req = {
        body: {
          page: {
            sorted: 100
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isNumber : true, customValidator: (value, req, error) => {
              if (value !== 100) {
                error('Invalid value customValidator');
              }
            }},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  });
  
  describe('isObject test', () => {
    test('Test nested objects Error case - Object test', () => {
      const req = {
        body: {
          page: {
            sorted: 'string'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isObject : true},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });

    test('Test nested objects Failure case - Object test', () => {
      const req = {
        body: {
          pageHead: {
            page: [
              {test: 1, test2: 2},
              {test: 1, test2: 2},
              {test: 1, test2: 'test'}
            ]
          }
        }
      };    
      const validation = [
        {param : 'pageHead', location : 'body', isObject : true, children : [
          {param : 'page', location : 'body', isArray : true, children : [
            {param: 'page-array', isRequired : true, isObject: true, children: [
              {param: 'test', isNumber: true},
              {param: 'test2', isNumber: true},
            ]},
          ]}
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'test2',
          }
        ]
      });
    });
  
    test('Test nested objects Failure case - Object test 2', () => {
      const req = {
        body: {
          pageHead: {
            page: {
              test: 1, test2: 'test'
            }
          }
        }
      };    
      const validation = [
        {param : 'pageHead', location : 'body', isObject : true, children : [
          {param : 'page', location : 'body', isObject : true, children : [
            {param: 'test', isNumber: true},
            {param: 'test2', isNumber: true},
          ]}
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'test2',
          }
        ]
      });
    });
  });
  
  describe('Email test', () => {
    test('Test nested objects Success case - Email test', () => {
      const req = {
        body: {
          page: {
            sorted: 'validemial@email.com'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isEmail : true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Success case - Email test - default location must be body', () => {
      const req = {
        body: {
          page: {
            sorted: 'validemial@email.com'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isEmail : true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor(null, validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - Email test', () => {
      const req = {
        body: {
          page: {
            sorted: 'not-a-valid-email'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isEmail : true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  });

  describe('UUID test', () => {
    test('Test nested objects Success case - UUID test', () => {
      const req = {
        body: {
          page: {
            sorted: '550e8400-e29b-41d4-a716-446655440000'
          }
        }
      };
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isUUID : true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });

    test('Test nested objects Error case - UUID test', () => {
      const req = {
        body: {
          page: {
            sorted: 'not-a-valid-uuid'
          }
        }
      };
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isUUID : true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  });

  describe('Date test', () => {
    test('Test nested objects Success case - Date test Format defauly YYYY-MM-DD', () => {
      const req = {
        body: {
          page: {
            sorted: '2012-09-19'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate: true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Success case - Date test - Format DD-MM-YYYY', () => {
      const req = {
        body: {
          page: {
            sorted: '19-08-2019'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate: true, format: 'DD-MM-YYYY' },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Success case - Date test - Format MM-DD-YYYY', () => {
      const req = {
        body: {
          page: {
            sorted: '08-18-2019'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate: true, format: 'MM-DD-YYYY' },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Success case - Date test - Format MM/DD/YYYY', () => {
      const req = {
        body: {
          page: {
            sorted: '12/18/2019'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate: true, format: 'MM/DD/YYYY' },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Success case - Date test - Format DD/MM/YYYY', () => {
      const req = {
        body: {
          page: {
            sorted: '12/07/2019'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate: true, format: 'DD/MM/YYYY' },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Success case - Date test - Format YYYY/MM/DD', () => {
      const req = {
        body: {
          page: {
            sorted: '2901/07/19'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate: true, format: 'YYYY/MM/DD' },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - Date test', () => {
      const req = {
        body: {
          page: {
            sorted: 'not-a-valid-date'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate : true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Date test - Format', () => {
      const req = {
        body: {
          page: {
            sorted: '09-08-3045'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate : true, format: 'YYYY-MM-DD' },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Date test - Invalid month/date', () => {
      const req = {
        body: {
          page: {
            sorted: '2222-89-45'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate : true, format: 'YYYY-MM-DD' },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Date test - Invalid Format', () => {
      const req = {
        body: {
          page: {
            sorted: '2019-23-02'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, isDate : true, format: 'YYYY/DD/MM' },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  });

  describe('Mobile number test', () => {
    test('Test nested objects Success case - Mobile number test', () => {
      const req = {
        body: {
          page: {
            sorted: '919035803903'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 1, max : 10}} },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Success case - Mobile number test - country code not mandatory', () => {
      const req = {
        body: {
          page: {
            sorted: '919035803903'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : false, length: {min : 1, max : 10}} },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - Mobile number test - country code mandatory', () => {
      const req = {
        body: {
          page: {
            sorted: '9035803903'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 1, max : 10}} },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Mobile number test - length range min', () => {
      const req = {
        body: {
          page: {
            sorted: '919035844'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 8, max : 10}} },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Mobile number test - length range max', () => {
      const req = {
        body: {
          page: {
            sorted: '9190358444444'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 8, max : 10}} },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Error case - Mobile number test', () => {
      const req = {
        body: {
          page: {
            sorted: 'not-a-valid-mobile number'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 1, max : 10}} },
      ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  });

  describe('Length test', () => {
    test('Test nested objects Success case - length test', () => {
      const req = {
        body: {
          page: {
            sorted: '33'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, length: { min: 2, max: 5 } },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - length test', () => {
      const req = {
        body: {
          page: {
            sorted: '34334344'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, length: { min: 2, max: 5 } },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  });

  describe('Includes and Excludes test', () => {
    test('Test nested objects Success case - includes test', () => {
      const req = {
        body: {
          page: {
            sorted: 'enabled'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, includes: [ 'enabled', 'disabled' ] },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - includes test', () => {
      const req = {
        body: {
          page: {
            sorted: '34334344'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, includes: [ 'enabled', 'disabled' ] },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });
  
    test('Test nested objects Success case - excludes test', () => {
      const req = {
        body: {
          page: {
            sorted: '34334344'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, excludes: [ 'enabled', 'disabled' ] },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Error case - excludes test', () => {
      const req = {
        body: {
          page: {
            sorted: 'enabled'
          }
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isObject : true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, excludes: [ 'enabled', 'disabled' ] },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'sorted',
          }
        ]
      });
    });

    test('Test nested objects Error case -- first object set required', () => {
      const req = {
        body: {
          page: {
            sorted: 'enabled'
          }
        }
      };    
      const validation = [
        {param : 'pages', location : 'body', isObject : true, isRequired: true, children : [
            {param : 'sorted', location : 'body.page', isRequired : true, excludes: [ 'enabled', 'disabled' ] },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'pages',
          }
        ]
      });
    });
  });
  
  describe('Arrays test', () => {
    test('Test nested objects Failure case - Array test', () => {
      const req = {
        body: {
          page: [
            1, 2, 3, 'sdsd'
          ]
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isArray : true, children : [
            {param: 'page-array', isRequired : true, isNumber: true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'page-array',
          }
        ]
      });
    });
    test('Test nested objects Success case - Array test', () => {
      const req = {
        body: {
          page: [
            1, 2, 3
          ]
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isArray : true, children : [
            {param: 'page-array', isRequired : true, isNumber: true },
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
    });
    test('Test nested objects Failure case - Array test 2', () => {
      const req = {
        body: {
          page: [
            {test: 1, test2: 2},
            {test: 1, test2: 2},
            {test: 1, test2: 'test'}
          ]
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isArray : true, children : [
            {param: 'page-array', isRequired : true, isObject: true, children: [
              {param: 'test', isNumber: true},
              {param: 'test2', isNumber: true},
            ]},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'test2',
          }
        ]
      });
    });
    test('Test nested objects Success case - Array test 2', () => {
      const req = {
        body: {
          page: [
            {test: 1, test2: 2},
            {test: 1, test2: 2},
            {test: 1, test2: 323}
          ]
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isArray : true, children : [
            {param: 'page-array', isRequired : true, isObject: true, children: [
              {param: 'test', isNumber: true},
              {param: 'test2', isNumber: true},
            ]},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
    });
  
    test('Test nested objects Failure case - Array test 3 multiple errors', () => {
      const req = {
        body: {
          page: [
            {test: 1, test2: 2},
            {test: 1, test2: 2},
            {test: 1, test2: 'test'}
          ],
          page1: [
            {test: 1, test2: 2},
            {test: 1, test2: 2},
            {test: 1, test2: 'test'}
          ]
        }
      };    
      const validation = [
        {param : 'page', location : 'body', isArray : true, children : [
            {param: 'page-array', isRequired : true, isObject: true, children: [
              {param: 'test', isNumber: true},
              {param: 'test2', isNumber: true},
            ]},
        ]},
        {param : 'page1', location : 'body', isArray : true, children : [
          {param: 'page1-array', isRequired : true, isObject: true, children: [
            {param: 'test', isNumber: true},
            {param: 'test2', isNumber: true},
          ]},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'test2',
          },
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'test2',
          }
        ]
      });
    });
    test('Test nested objects - object in array required check', () => {
      const req = {
        body: {
          page1: [
            {test: 1, test2: 2},
            {test: 1},
          ]
        }
      };    
      const validation = [
        {param : 'page1', location : 'body', isArray : true, children : [
          {param: 'page1-array', isRequired : true, isObject: true, children: [
            {param: 'test', isNumber: true},
            {param: 'test2', isNumber: true, isRequired: true},
          ]},
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'test2',
          }
        ]
      });
    });
    test('Test nested Arrays Failure case - Array of arrays 1', () => {
      const req = {
        body: {
          pageHead: {
            page: [
              [1, 2, 3.],
              {a: 1}
            ]
          }
        }
      };    
      const validation = [
        {param : 'pageHead', location : 'body', isObject : true, children : [
          {param : 'page', location : 'body', isArray : true, children : [
            {param: 'page-array', isRequired : true, isArray: true, children: [
              {param: 'page-child-array', isRequired : true, isNumber: true }
            ]}
          ]}
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'page-array',
          }
        ]
      });
    });
  
    test('Test nested Arrays Failure case - Array of arrays 2', () => {
      const req = {
        body: {
          pageHead: {
            page: [
              [1, 2, 3, 'string'],
            ]
          }
        }
      };    
      const validation = [
        {param : 'pageHead', location : 'body', isObject : true, children : [
          {param : 'page', location : 'body', isArray : true, children : [
            {param: 'page-array', isRequired : true, isArray: true, children: [
              {param: 'page-child-array', isRequired : true, isNumber: true }
            ]}
          ]}
        ]}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.status).toHaveBeenCalledTimes(1);
      expect(resp.send).toHaveBeenCalledWith({
        error: [
          {
            location: 'body',
            message: 'Invalid Field Error',
            param: 'page-child-array',
          }
        ]
      });
    });
  });

  describe('Header test', () => {
    test('Test Success case - Required test - path headers', () => {
      const req = {
        headers: {
          Authorization: 'Bearer testauth'
        }
      };    
      const validation = [
        {param : 'Authorization', location : 'headers', isRequired : true}
      ];
      const response = {
        mode: 'reject'
      };
      const validatorfn = validaor('headers', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(resp.status).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledTimes(0);
    });
  });

  describe('Default parameters', () => {
    test('Calling validator with no arguments uses defaults', () => {
      const req = { body: {} };
      const validatorfn = validaor();
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error message with #value on missing field', () => {
    test('Custom message with #value replacement when value is undefined', () => {
      const req = { body: {} };
      const validation = [
        { param: 'field1', isRequired: true, message: 'Field #value is required' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledWith({
        error: [{
          location: 'body',
          param: 'field1',
          message: 'Field  is required',
        }]
      });
    });
  });

  describe('Length check with non-numeric string', () => {
    test('Length check on a non-numeric string value', () => {
      const req = {
        body: {
          page: { sorted: 'hello' }
        }
      };
      const validation = [
        { param: 'page', isObject: true, children: [
          { param: 'sorted', isRequired: true, length: { min: 2, max: 10 } },
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('customValidator error without message', () => {
    test('Calling error callback without a message uses default', () => {
      const req = {
        body: {
          page: { sorted: 'test' }
        }
      };
      const validation = [
        { param: 'page', isObject: true, children: [
          { param: 'sorted', customValidator: (value, req, error) => { error(); } },
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(0);
      expect(resp.send).toHaveBeenCalledWith({
        error: [{
          location: 'body',
          param: 'sorted',
          message: 'Invalid Field Error',
        }]
      });
    });
  });

  describe('Mobile number without countryCode', () => {
    test('Mobile number validation without countryCode set', () => {
      const req = {
        body: {
          page: { sorted: '9035803903' }
        }
      };
      const validation = [
        { param: 'page', isObject: true, children: [
          { param: 'sorted', isRequired: true, mobileNumber: { length: { min: 5, max: 12 } } },
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('Children without isArray or isObject flag', () => {
    test('Top-level field with children but no isArray/isObject', () => {
      const req = {
        body: { page: { nested: 123 } }
      };
      const validation = [
        { param: 'page', children: [
          { param: 'nested', isNumber: true },
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    test('Object child with children but no isArray/isObject', () => {
      const req = {
        body: {
          page: { child: { nested: 123 } }
        }
      };
      const validation = [
        { param: 'page', isObject: true, children: [
          { param: 'child', children: [
            { param: 'nested', isNumber: true },
          ]},
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    test('Array child with children but no isArray/isObject', () => {
      const req = {
        body: {
          page: [
            { nested: 123 },
          ]
        }
      };
      const validation = [
        { param: 'page', isArray: true, children: [
          { param: 'page-array', children: [
            { param: 'nested', isNumber: true },
          ]},
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('defaultValue', () => {
    test('Sets default value when field is undefined', () => {
      const req = { body: {} };
      const validation = [
        { param: 'status', defaultValue: 'active' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.status).toBe('active');
    });

    test('Sets default value when field is null', () => {
      const req = { body: { status: null } };
      const validation = [
        { param: 'status', defaultValue: 'active' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.status).toBe('active');
    });

    test('Sets default value when field is empty string', () => {
      const req = { body: { status: '' } };
      const validation = [
        { param: 'status', defaultValue: 'active' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.status).toBe('active');
    });

    test('Does not override existing value', () => {
      const req = { body: { status: 'inactive' } };
      const validation = [
        { param: 'status', defaultValue: 'active' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.status).toBe('inactive');
    });

    test('Sets default numeric value 0', () => {
      const req = { body: {} };
      const validation = [
        { param: 'count', isNumber: true, defaultValue: 0 }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.count).toBe(0);
    });

    test('Does not apply default for arrays', () => {
      const req = { body: {} };
      const validation = [
        { param: 'items', isArray: true, defaultValue: [] }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.items).toBeUndefined();
    });

    test('Does not apply default for objects', () => {
      const req = { body: {} };
      const validation = [
        { param: 'meta', isObject: true, defaultValue: {} }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.meta).toBeUndefined();
    });

    test('Sets default value for nested child field', () => {
      const req = { body: { page: { } } };
      const validation = [
        { param: 'page', isObject: true, children: [
          { param: 'status', defaultValue: 'pending' },
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.page.status).toBe('pending');
    });

    test('Sets default value for fields inside array of objects', () => {
      const req = {
        body: {
          items: [
            { name: 'item1' },
            { name: 'item2', status: 'done' },
          ]
        }
      };
      const validation = [
        { param: 'items', isArray: true, children: [
          { param: 'items-array', isObject: true, children: [
            { param: 'name', isRequired: true },
            { param: 'status', defaultValue: 'pending' },
          ]},
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.items[0].status).toBe('pending');
      expect(req.body.items[1].status).toBe('done');
    });

    test('Sets default with isRequired - passes validation after default applied', () => {
      const req = { body: {} };
      const validation = [
        { param: 'status', isRequired: true, defaultValue: 'active' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.status).toBe('active');
    });

    test('Sets default value on query location', () => {
      const req = { query: {} };
      const validation = [
        { param: 'page', defaultValue: '1' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('query', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.query.page).toBe('1');
    });

    test('Sets default value on params location', () => {
      const req = { params: {} };
      const validation = [
        { param: 'id', defaultValue: '0' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('params', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.params.id).toBe('0');
    });

    test('Sets default value on headers location', () => {
      const req = { headers: {} };
      const validation = [
        { param: 'x-custom', defaultValue: 'default-header' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('headers', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.headers['x-custom']).toBe('default-header');
    });
  });

  describe('removeIfEmpty', () => {
    test('Removes field when value is undefined', () => {
      const req = { body: { name: 'test' } };
      const validation = [
        { param: 'status', removeIfEmpty: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect('status' in req.body).toBe(false);
    });

    test('Removes field when value is null', () => {
      const req = { body: { status: null } };
      const validation = [
        { param: 'status', removeIfEmpty: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect('status' in req.body).toBe(false);
    });

    test('Removes field when value is empty string', () => {
      const req = { body: { status: '' } };
      const validation = [
        { param: 'status', removeIfEmpty: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect('status' in req.body).toBe(false);
    });

    test('Removes array field when value is empty array', () => {
      const req = { body: { items: [] } };
      const validation = [
        { param: 'items', isArray: true, removeIfEmpty: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect('items' in req.body).toBe(false);
    });

    test('Removes object field when value is empty object', () => {
      const req = { body: { meta: {} } };
      const validation = [
        { param: 'meta', isObject: true, removeIfEmpty: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect('meta' in req.body).toBe(false);
    });

    test('Does not remove field when array has items', () => {
      const req = { body: { items: [1, 2, 3] } };
      const validation = [
        { param: 'items', isArray: true, removeIfEmpty: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.items).toEqual([1, 2, 3]);
    });

    test('Does not remove field when object has keys', () => {
      const req = { body: { meta: { key: 'val' } } };
      const validation = [
        { param: 'meta', isObject: true, removeIfEmpty: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.meta).toEqual({ key: 'val' });
    });

    test('Does not remove field when string has value', () => {
      const req = { body: { status: 'active' } };
      const validation = [
        { param: 'status', removeIfEmpty: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.status).toBe('active');
    });

    test('Removes nested child field when empty', () => {
      const req = { body: { page: { status: '' } } };
      const validation = [
        { param: 'page', isObject: true, children: [
          { param: 'status', removeIfEmpty: true },
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect('status' in req.body.page).toBe(false);
    });

    test('Removes fields inside array of objects when empty', () => {
      const req = {
        body: {
          items: [
            { name: 'item1', tag: '' },
            { name: 'item2', tag: 'important' },
          ]
        }
      };
      const validation = [
        { param: 'items', isArray: true, children: [
          { param: 'items-array', isObject: true, children: [
            { param: 'name', isRequired: true },
            { param: 'tag', removeIfEmpty: true },
          ]},
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect('tag' in req.body.items[0]).toBe(false);
      expect(req.body.items[1].tag).toBe('important');
    });

    test('defaultValue applied before removeIfEmpty - default keeps field', () => {
      const req = { body: {} };
      const validation = [
        { param: 'status', defaultValue: 'active', removeIfEmpty: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.status).toBe('active');
    });

    test('Handles null items in array of objects with child defaultValue', () => {
      const req = {
        body: {
          items: [
            null,
            { name: 'item1' },
          ]
        }
      };
      const validation = [
        { param: 'items', isArray: true, children: [
          { param: 'items-array', isObject: true, children: [
            { param: 'name', isRequired: true },
            { param: 'status', defaultValue: 'pending' },
          ]},
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(req.body.items[0]).toBe(null);
      expect(req.body.items[1].status).toBe('pending');
    });
  });

  describe('convertToFormat', () => {
    test('Converts YYYY-MM-DD to DD/MM/YYYY', () => {
      const req = { body: { date: '2026-03-04' } };
      const validation = [
        { param: 'date', isDate: true, format: 'YYYY-MM-DD', convertToFormat: 'DD/MM/YYYY' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('04/03/2026');
    });

    test('Converts DD-MM-YYYY to YYYY/MM/DD', () => {
      const req = { body: { date: '04-03-2026' } };
      const validation = [
        { param: 'date', isDate: true, format: 'DD-MM-YYYY', convertToFormat: 'YYYY/MM/DD' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('2026/03/04');
    });

    test('Converts MM-DD-YYYY to DD-MM-YYYY', () => {
      const req = { body: { date: '03-04-2026' } };
      const validation = [
        { param: 'date', isDate: true, format: 'MM-DD-YYYY', convertToFormat: 'DD-MM-YYYY' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('04-03-2026');
    });

    test('Converts YYYY/MM/DD to MM/DD/YYYY', () => {
      const req = { body: { date: '2026/03/04' } };
      const validation = [
        { param: 'date', isDate: true, format: 'YYYY/MM/DD', convertToFormat: 'MM/DD/YYYY' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('03/04/2026');
    });

    test('Converts DD/MM/YYYY to YYYY-MM-DD', () => {
      const req = { body: { date: '04/03/2026' } };
      const validation = [
        { param: 'date', isDate: true, format: 'DD/MM/YYYY', convertToFormat: 'YYYY-MM-DD' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('2026-03-04');
    });

    test('Converts MM/DD/YYYY to MM-DD-YYYY', () => {
      const req = { body: { date: '03/04/2026' } };
      const validation = [
        { param: 'date', isDate: true, format: 'MM/DD/YYYY', convertToFormat: 'MM-DD-YYYY' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('03-04-2026');
    });

    test('Uses default YYYY-MM-DD source format when format not specified', () => {
      const req = { body: { date: '2026-03-04' } };
      const validation = [
        { param: 'date', isDate: true, convertToFormat: 'DD/MM/YYYY' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('04/03/2026');
    });

    test('Does not convert when convertToFormat is not set', () => {
      const req = { body: { date: '2026-03-04' } };
      const validation = [
        { param: 'date', isDate: true, format: 'YYYY-MM-DD' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('2026-03-04');
    });

    test('Does not convert when isDate is not set', () => {
      const req = { body: { date: '2026-03-04' } };
      const validation = [
        { param: 'date', convertToFormat: 'DD/MM/YYYY' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('2026-03-04');
    });

    test('Does not convert when date validation fails', () => {
      const req = { body: { date: 'not-a-date' } };
      const validation = [
        { param: 'date', isDate: true, format: 'YYYY-MM-DD', convertToFormat: 'DD/MM/YYYY' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(resp.status).toHaveBeenCalledWith(422);
      expect(req.body.date).toBe('not-a-date');
    });

    test('Does not convert when value is empty', () => {
      const req = { body: {} };
      const validation = [
        { param: 'date', isDate: true, convertToFormat: 'DD/MM/YYYY' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBeUndefined();
    });

    test('Converts date in nested object child', () => {
      const req = { body: { event: { startDate: '04-03-2026' } } };
      const validation = [
        { param: 'event', isObject: true, children: [
          { param: 'startDate', isDate: true, format: 'DD-MM-YYYY', convertToFormat: 'YYYY-MM-DD' },
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.event.startDate).toBe('2026-03-04');
    });

    test('Converts dates inside array of objects', () => {
      const req = {
        body: {
          events: [
            { date: '04/03/2026' },
            { date: '25/12/2025' },
          ]
        }
      };
      const validation = [
        { param: 'events', isArray: true, children: [
          { param: 'events-entry', isObject: true, children: [
            { param: 'date', isDate: true, format: 'DD/MM/YYYY', convertToFormat: 'YYYY-MM-DD' },
          ]},
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.events[0].date).toBe('2026-03-04');
      expect(req.body.events[1].date).toBe('2025-12-25');
    });

    test('Converts in query location', () => {
      const req = { query: { startDate: '2026-03-04' } };
      const validation = [
        { param: 'startDate', isDate: true, convertToFormat: 'DD/MM/YYYY' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('query', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.query.startDate).toBe('04/03/2026');
    });

    test('Skips conversion when convertToFormat is unsupported', () => {
      const req = { body: { date: '2026-03-04' } };
      const validation = [
        { param: 'date', isDate: true, format: 'YYYY-MM-DD', convertToFormat: 'YYYY/DD/MM' }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.date).toBe('2026-03-04');
    });

    test('Converts dates in array of primitive date strings', () => {
      const req = {
        body: {
          dates: ['2026-03-04', '2025-12-25', '2024-06-15']
        }
      };
      const validation = [
        { param: 'dates', isArray: true, children: [
          { param: 'dates-entry', isDate: true, convertToFormat: 'DD/MM/YYYY' },
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.dates[0]).toBe('04/03/2026');
      expect(req.body.dates[1]).toBe('25/12/2025');
      expect(req.body.dates[2]).toBe('15/06/2024');
    });

    test('Converts dates in array of primitive date strings with custom source format', () => {
      const req = {
        body: {
          dates: ['04/03/2026', '25/12/2025']
        }
      };
      const validation = [
        { param: 'dates', isArray: true, children: [
          { param: 'dates-entry', isDate: true, format: 'DD/MM/YYYY', convertToFormat: 'YYYY-MM-DD' },
        ]}
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.dates[0]).toBe('2026-03-04');
      expect(req.body.dates[1]).toBe('2025-12-25');
    });
  });

  describe('cleanUp', () => {
    test('Removes undeclared keys from body', () => {
      const req = {
        body: {
          name: 'John',
          email: 'john@test.com',
          hackAttempt: 'malicious',
          extraField: 'should be removed'
        }
      };
      const validation = [
        { param: 'name', isRequired: true },
        { param: 'email', isEmail: true }
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.name).toBe('John');
      expect(req.body.email).toBe('john@test.com');
      expect(req.body.hackAttempt).toBeUndefined();
      expect(req.body.extraField).toBeUndefined();
    });

    test('Removes undeclared keys from query', () => {
      const req = {
        query: {
          page: '1',
          limit: '10',
          injection: 'DROP TABLE'
        }
      };
      const validation = [
        { param: 'page', isNumber: true },
        { param: 'limit', isNumber: true }
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor('query', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.query.page).toBe('1');
      expect(req.query.limit).toBe('10');
      expect(req.query.injection).toBeUndefined();
    });

    test('Removes undeclared keys from params', () => {
      const req = {
        params: {
          id: '123',
          extraParam: 'remove-me'
        }
      };
      const validation = [
        { param: 'id', isRequired: true }
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor('params', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.params.id).toBe('123');
      expect(req.params.extraParam).toBeUndefined();
    });

    test('Removes undeclared keys from nested objects', () => {
      const req = {
        body: {
          user: {
            name: 'John',
            age: 25,
            password: 'secret',
            internalId: 'should-remove'
          }
        }
      };
      const validation = [
        { param: 'user', isObject: true, children: [
          { param: 'name', isRequired: true },
          { param: 'age', isNumber: true }
        ]}
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.user.name).toBe('John');
      expect(req.body.user.age).toBe(25);
      expect(req.body.user.password).toBeUndefined();
      expect(req.body.user.internalId).toBeUndefined();
    });

    test('Removes undeclared keys from arrays of objects', () => {
      const req = {
        body: {
          users: [
            { name: 'John', role: 'admin', secretToken: 'abc123' },
            { name: 'Jane', role: 'user', secretToken: 'xyz789' }
          ]
        }
      };
      const validation = [
        { param: 'users', isArray: true, children: [
          { param: 'users-entry', isObject: true, children: [
            { param: 'name', isRequired: true },
            { param: 'role' }
          ]}
        ]}
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.users[0].name).toBe('John');
      expect(req.body.users[0].role).toBe('admin');
      expect(req.body.users[0].secretToken).toBeUndefined();
      expect(req.body.users[1].name).toBe('Jane');
      expect(req.body.users[1].role).toBe('user');
      expect(req.body.users[1].secretToken).toBeUndefined();
    });

    test('Does not remove keys when cleanUp is not enabled', () => {
      const req = {
        body: {
          name: 'John',
          extraField: 'should stay'
        }
      };
      const validation = [
        { param: 'name', isRequired: true }
      ];
      const response = { mode: 'reject' };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.name).toBe('John');
      expect(req.body.extraField).toBe('should stay');
    });

    test('Handles deeply nested objects with cleanUp', () => {
      const req = {
        body: {
          level1: {
            level2: {
              keepMe: 'value',
              removeMe: 'gone'
            },
            alsoRemove: 'bye'
          }
        }
      };
      const validation = [
        { param: 'level1', isObject: true, children: [
          { param: 'level2', isObject: true, children: [
            { param: 'keepMe' }
          ]}
        ]}
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.level1.level2.keepMe).toBe('value');
      expect(req.body.level1.level2.removeMe).toBeUndefined();
      expect(req.body.level1.alsoRemove).toBeUndefined();
    });

    test('cleanUp works with headers', () => {
      const req = {
        headers: {
          authorization: 'Bearer token',
          'content-type': 'application/json',
          'x-malicious-header': 'bad'
        }
      };
      const validation = [
        { param: 'authorization', isRequired: true },
        { param: 'content-type' }
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor('headers', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.headers.authorization).toBe('Bearer token');
      expect(req.headers['content-type']).toBe('application/json');
      expect(req.headers['x-malicious-header']).toBeUndefined();
    });

    test('cleanUp preserves empty objects and arrays when declared', () => {
      const req = {
        body: {
          tags: [],
          metadata: {},
          extra: 'remove'
        }
      };
      const validation = [
        { param: 'tags', isArray: true },
        { param: 'metadata', isObject: true }
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.tags).toEqual([]);
      expect(req.body.metadata).toEqual({});
      expect(req.body.extra).toBeUndefined();
    });

    test('cleanUp works with forward mode', () => {
      const req = {
        body: {
          name: 'John',
          extraField: 'remove'
        },
        locals: {}
      };
      const validation = [
        { param: 'name', isRequired: true }
      ];
      const response = { mode: 'forward', cleanUp: true };
      const validatorfn = validaor('body', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.name).toBe('John');
      expect(req.body.extraField).toBeUndefined();
    });

    test('cleanUp works with locals location', () => {
      const req = {
        locals: {
          name: 'John',
          extraField: 'remove'
        }
      };
      const validation = [
        { param: 'name', isRequired: true }
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor('locals', validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.locals.name).toBe('John');
      expect(req.locals.extraField).toBeUndefined();
    });

    test('cleanUp works with default (null) location', () => {
      const req = {
        body: {
          name: 'John',
          extraField: 'remove'
        }
      };
      const validation = [
        { param: 'name', isRequired: true }
      ];
      const response = { mode: 'reject', cleanUp: true };
      const validatorfn = validaor(null, validation, response);
      validatorfn(req, resp, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.body.name).toBe('John');
      expect(req.body.extraField).toBeUndefined();
    });
  });
});
