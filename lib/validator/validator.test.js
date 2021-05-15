const validaor = require('./validator');

const next = jest.fn();
const resp = {
  status: jest.fn(()=>resp),
  send: jest.fn(()=>resp)
}

describe('Test for body params', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Test nested objects Success case - Boolean test', () => {
    const req = {
      body: {
        page: {
          sorted: 'True'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
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
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Error case - Mode test forward', () => {
    const req = {
      body: {
        page: {
          sorted: 'error-string'
        }
      },
      locals: {}
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
      ]}
    ]
    const response = {
      mode: 'forward'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0);
    expect(req.locals.statusCode).toEqual(422);
    expect(req.locals.skipService).toEqual(true);
    expect(req.locals.data).toEqual({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    });
  });

  test('Test nested objects Error case - Status code test', () => {
    const req = {
      body: {
        page: {
          sorted: 'error-string'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledWith(422);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Error case - Predefined Status code test', () => {
    const req = {
      body: {
        page: {
          sorted: 'error-string'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
      ]}
    ]
    const response = {
      mode: 'reject',
      errorCode: 400
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledWith(400);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Error case - Predefined error message', () => {
    const req = {
      body: {
        page: {
          sorted: 'error-string'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true, message:'Mandatory field sorted missing'},
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Mandatory field sorted missing',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Error case - Required Test', () => {
    const req = {
      body: {
        page: {
          sorted: 'error-string'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isBoolean : true},
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Success case - Required Test 2', () => {
    const req = {
      body: {
        page: {}
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isBoolean : true},
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('Test nested objects Success case - Number test', () => {
    const req = {
      body: {
        page: {
          sorted: '5'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true, range: { min: 2, max: 9 } },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
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
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Success case - Number test - Range', () => {
    const req = {
      body: {
        page: {
          sorted: 2
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true, range: { min: 2, max: 9 } },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0)
  });

  test('Test nested objects Error case - Number test - Range', () => {
    const req = {
      body: {
        page: {
          sorted: 10
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isNumber : true, range: { min: 2, max: 9 } },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Success case - Email test', () => {
    const req = {
      body: {
        page: {
          sorted: 'validemial@email.com'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isEmail : true },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0)
  });

  test('Test nested objects Error case - Email test', () => {
    const req = {
      body: {
        page: {
          sorted: 'not-a-valid-email'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isEmail : true },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Success case - Date test', () => {
    const req = {
      body: {
        page: {
          sorted: '2012-09-09'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isDate: true },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0)
  });

  test('Test nested objects Success case - Date test - Format', () => {
    const req = {
      body: {
        page: {
          sorted: '09-08-2019'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isDate: true, format: 'DD-MM-YYYY' },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0)
  });

  test('Test nested objects Error case - Date test', () => {
    const req = {
      body: {
        page: {
          sorted: 'not-a-valid-date'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isDate : true },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Error case - Date test - Format', () => {
    const req = {
      body: {
        page: {
          sorted: '09-08-3045'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, isDate : true, format: 'YYYY-MM-DD' },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Success case - Mobile number test', () => {
    const req = {
      body: {
        page: {
          sorted: '919035803903'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 1, max : 10}} },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0)
  });

  test('Test nested objects Success case - Mobile number test - country code not mandatory', () => {
    const req = {
      body: {
        page: {
          sorted: '919035803903'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : false, length: {min : 1, max : 10}} },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0)
  });

  test('Test nested objects Error case - Mobile number test - country code mandatory', () => {
    const req = {
      body: {
        page: {
          sorted: '9035803903'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 1, max : 10}} },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Error case - Mobile number test - length range min', () => {
    const req = {
      body: {
        page: {
          sorted: '919035844'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 8, max : 10}} },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Error case - Mobile number test - length range max', () => {
    const req = {
      body: {
        page: {
          sorted: '9190358444444'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 8, max : 10}} },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Error case - Mobile number test', () => {
    const req = {
      body: {
        page: {
          sorted: 'not-a-valid-mobile number'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
        {param : 'sorted', location : 'body.page', isRequired : true, mobileNumber: {countryCode : '91', isCountryCodeMandatory : true, length: {min : 1, max : 10}} },
    ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Success case - length test', () => {
    const req = {
      body: {
        page: {
          sorted: '33'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, length: { min: 2, max: 5 } },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0)
  });

  test('Test nested objects Error case - length test', () => {
    const req = {
      body: {
        page: {
          sorted: '34334344'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, length: { min: 2, max: 5 } },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Success case - includes test', () => {
    const req = {
      body: {
        page: {
          sorted: 'enabled'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, includes: [ 'enabled', 'disabled' ] },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0)
  });

  test('Test nested objects Error case - includes test', () => {
    const req = {
      body: {
        page: {
          sorted: '34334344'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, includes: [ 'enabled', 'disabled' ] },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });

  test('Test nested objects Success case - excludes test', () => {
    const req = {
      body: {
        page: {
          sorted: '34334344'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, excludes: [ 'enabled', 'disabled' ] },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledTimes(0);
    expect(resp.send).toHaveBeenCalledTimes(0)
  });

  test('Test nested objects Error case - excludes test', () => {
    const req = {
      body: {
        page: {
          sorted: 'enabled'
        }
      }
    }    
    const validation = [
      {param : 'page', location : 'body', isObject : true, children : [
          {param : 'sorted', location : 'body.page', isRequired : true, excludes: [ 'enabled', 'disabled' ] },
      ]}
    ]
    const response = {
      mode: 'reject'
    }
    const validatorfn = validaor(validation, response);
    validatorfn(req, resp, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledWith({
      error: [
        {
          location: 'body.page',
          message: 'Invalid Field Error',
          param: 'sorted',
        }
      ]
    })
  });
})
