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
});
