const { validateBody, validateParam, validateQuery, validateHeader, param } = require('./queryBuilder');
const validator = require('../validator');
jest.mock('../validator');

describe('Test for validateBody', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('validateBody response object', () => {
    validateBody().isToBeRejected().sendErrorCode(500).debug(true).addParams([
      param('test').isNumber()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'reject', errorCode: 500, debug: true }
    );
  });
  test('validateBody response object', () => {
    validateBody().isToBeForwarded().sendErrorCode(500).debug(false).addParams([
      param('test').isNumber()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'forward', errorCode: 500, debug: false }
    );
  });
  test('validateBody response object empty', () => {
    validateBody().addParams([
      param('test').isNumber()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], {}
    );
  });
  test('validateBody validator object isNumber', () => {
    validateBody().addParams([
      param('test').isNumber()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], {}
    );
  });
  test('validateBody validator object isNumber and min max ranges', () => {
    validateBody().addParams([
      param('test').minimumNumber(1).maximumNumber(10)
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
        range: { min: 1, max: 10 }
      }], {}
    );
  });
  test('validateBody validator object isBoolean', () => {
    validateBody().addParams([
      param('test').isBoolean()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isBoolean: true,
      }], {}
    );
  });
  test('validateBody validator object isRequired', () => {
    validateBody().addParams([
      param('test').isRequired()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isRequired: true,
      }], {}
    );
  });
  test('validateBody validator object isArray', () => {
    validateBody().addParams([
      param('test').isArray()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isArray: true,
      }], {}
    );
  });
  test('validateBody validator object isObject', () => {
    validateBody().addParams([
      param('test').isRequired().isObject()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isObject: true,
        isRequired: true,
      }], {}
    );
  });
  test('validateBody validator object isArray and object child', () => {
    validateBody().addParams([
      param('test').isArray().addChildren([
        param('child1').isObject().addChild(
          param('child11').isNumber()
        ),
        param('child2').isObject().addChild(
          param('child21').isNumber()
        )
      ])
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isArray: true,
        children: [
          { param: 'child1', isObject: true, children: [
            { param: 'child11', isNumber: true }
          ] },
          { param: 'child2', isObject: true, children: [
            { param: 'child21', isNumber: true }
          ] }
        ]
      }], {}
    );
  });
  test('validateBody validator object isArray and object child nested', () => {
    validateBody().addParams([
      param('test').isArray().addChildren([
        param('child1').isObject().addChild(
          param('child11').isObject().addChild(
            param('child111').isNumber()
          )
        ),
        param('child2').isObject().addChild(
          param('child21').isNumber()
        )
      ])
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isArray: true,
        children: [
          { param: 'child1', isObject: true, children: [
            { param: 'child11', isObject: true, children: [
              { param: 'child111', isNumber: true }
            ] }
          ] },
          { param: 'child2', isObject: true, children: [
            { param: 'child21', isNumber: true }
          ] }
        ]
      }], {}
    );
  });
  test('validateBody validator object isArray and object child nested - 1', () => {
    validateBody().addParams([
      param('test').isArray().addChildren([
        param('child1').isObject().addChildren([
          param('param1').isRequired(),
          param('param2').isNumber()
        ])
      ])
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isArray: true,
        children: [
          { param: 'child1', isObject: true, children: [
            { param: 'param1', isRequired: true},
            { param: 'param2', isNumber: true},
          ]}
        ]
      }], {}
    );
  });
  test('validateBody validator object isArray and object child nested - 2', () => {
    validateBody().addParams([
      param('test').isArray().addChild(
        param('child1').isObject().addChildren([
          param('param1').isRequired(),
          param('param2').isNumber()
        ])
      )
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isArray: true,
        children: [
          { param: 'child1', isObject: true, children: [
            { param: 'param1', isRequired: true},
            { param: 'param2', isNumber: true},
          ]}
        ]
      }], {}
    );
  });
  test('validateBody validator object shouldInclude', () => {
    validateBody().addParams([
      param('test').shouldInclude(['a','b'])
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        includes: ['a','b'],
      }], {}
    );
  });
  test('validateBody validator object shouldExclude', () => {
    validateBody().addParams([
      param('test').shouldExclude(['a','b'])
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        excludes: ['a','b'],
      }], {}
    );
  });
  test('validateBody validator object isObject', () => {
    validateBody().addParams([
      param('test').isObject()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isObject: true,
      }], {}
    );
  });
  test('validateBody validator object customValidator', () => {
    const validatorfn = jest.fn();
    validateBody().addParams([
      param('test').customValidator(validatorfn)
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        customValidator: validatorfn,
      }], {}
    );
  });
  test('validateBody validator object isEmail', () => {
    validateBody().addParams([
      param('test').isEmail()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isEmail: true,
      }], {}
    );
  });
  test('validateBody validator object isUUID', () => {
    validateBody().addParams([
      param('test').isUUID()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isUUID: true,
      }], {}
    );
  });
  test('validateBody validator object isDate', () => {
    validateBody().addParams([
      param('test').isDate()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isDate: true,
      }], {}
    );
  });
  test('validateBody validator object Date Format', () => {
    validateBody().addParams([
      param('test').dateFormat('MM-DD-YYYY')
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isDate: true,
        format: 'MM-DD-YYYY',
      }], {}
    );
  });
  test('validateBody validator object length', () => {
    validateBody().addParams([
      param('test').minimumLength(2).maximumLength(5)
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        length: { min: 2, max: 5 }
      }], {}
    );
  });
  test('validateBody validator object mobile number countryCode', () => {
    validateBody().addParams([
      param('test').isMobileNumberWithCountryCode('91')
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        mobileNumber: { 
          countryCode: '91',
          length: {}
        }
      }], {}
    );
  });
  test('validateBody validator object mobile number isCountryCodeMandatory', () => {
    validateBody().addParams([
      param('test').isMobileNumberWithCountryCode('91').isMobileNumberWithCountryCodeMandatory()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        mobileNumber: { 
          countryCode: '91',
          isCountryCodeMandatory: true,
          length: {}
        }
      }], {}
    );
  });
  test('validateBody validator object mobile number isMobileNumberWithMaximumLength', () => {
    validateBody().addParams([
      param('test').isMobileNumberWithMaximumLength(10)
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        mobileNumber: { 
          length: { max: 10 }
        }
      }], {}
    );
  });
  test('validateBody validator object mobile number isMobileNumberWithMinimumLength', () => {
    validateBody().addParams([
      param('test').isMobileNumberWithMinimumLength(1)
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        mobileNumber: { 
          length: { min: 1 }
        }
      }], {}
    );
  });
  test('validateBody validator object mobile number length range', () => {
    validateBody().addParams([
      param('test').isMobileNumberWithMinimumLength(1).isMobileNumberWithMaximumLength(10)
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        mobileNumber: { 
          length: { min: 1, max: 10 }
        }
      }], {}
    );
  });
  test('validateBody validator object Error message', () => {
    validateBody().addParams([
      param('test').sendErrorMessage('Invalid Data')
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        message: 'Invalid Data',
      }], {}
    );
  });
  test('validateBody with plain object child (no builder)', () => {
    validateBody().addParams([
      param('test').isArray().addChild({ param: 'child', isNumber: true })
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isArray: true,
        children: [
          { param: 'child', isNumber: true }
        ]
      }], {}
    );
  });
  test('validateBody validator object defaultValue', () => {
    validateBody().addParams([
      param('test').defaultValue('default')
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        defaultValue: 'default',
      }], {}
    );
  });
  test('validateBody validator object defaultValue with number', () => {
    validateBody().addParams([
      param('test').isNumber().defaultValue(0)
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
        defaultValue: 0,
      }], {}
    );
  });
  test('validateBody validator object removeIfEmpty', () => {
    validateBody().addParams([
      param('test').removeIfEmpty()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        removeIfEmpty: true,
      }], {}
    );
  });
  test('validateBody validator object removeIfEmpty with isArray', () => {
    validateBody().addParams([
      param('test').isArray().removeIfEmpty()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isArray: true,
        removeIfEmpty: true,
      }], {}
    );
  });
  test('validateBody validator object removeIfEmpty with isObject', () => {
    validateBody().addParams([
      param('test').isObject().removeIfEmpty()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isObject: true,
        removeIfEmpty: true,
      }], {}
    );
  });
  test('validateBody validator object convertToFormat', () => {
    validateBody().addParams([
      param('test').isDate().dateFormat('YYYY-MM-DD').convertToFormat('DD/MM/YYYY')
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isDate: true,
        format: 'YYYY-MM-DD',
        convertToFormat: 'DD/MM/YYYY',
      }], {}
    );
  });
  test('validateBody validator object convertToFormat without dateFormat', () => {
    validateBody().addParams([
      param('test').isDate().convertToFormat('MM-DD-YYYY')
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isDate: true,
        convertToFormat: 'MM-DD-YYYY',
      }], {}
    );
  });
});
describe('Test for validateParam', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('validateParam response object', () => {
    validateParam().isToBeForwarded().sendErrorCode(500).debug(false).addParams([
      param('test').isNumber()
    ]);
    expect(validator).toHaveBeenCalledWith('params',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'forward', errorCode: 500, debug: false }
    );
  });
});
describe('Test for validateQuery', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('validateQuery response object', () => {
    validateQuery().isToBeForwarded().sendErrorCode(500).debug(false).addParams([
      param('test').isNumber()
    ]);
    expect(validator).toHaveBeenCalledWith('query',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'forward', errorCode: 500, debug: false }
    );
  });
});
describe('Test for validateHeader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('validateHeader response object', () => {
    validateHeader().isToBeForwarded().sendErrorCode(500).debug(false).addParams([
      param('test').isNumber()
    ]);
    expect(validator).toHaveBeenCalledWith('headers',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'forward', errorCode: 500, debug: false }
    );
  });
});

describe('Test for global removeIfEmpty', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('validateBody with global removeIfEmpty()', () => {
    validateBody().isToBeRejected().removeIfEmpty().addParams([
      param('test').isNumber()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'reject', removeIfEmpty: true }
    );
  });
});

describe('Test for cleanUp', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('validateBody with cleanUp()', () => {
    validateBody().isToBeRejected().cleanUp().addParams([
      param('test').isNumber()
    ]);
    expect(validator).toHaveBeenCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'reject', cleanUp: true }
    );
  });
});
