const { validateBody, validateParam, validateQuery, validateHeader, param } = require('./queryBuilder');
const validator = require('../validator');
jest.mock('../validator');

describe('Test for validateBody', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('validateBody response object', () => {
    validateBody().isToBeRejected().sendErrorCode(500).debug(true).addParams([
      param('test').isNumber().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'reject', errorCode: 500, debug: true }
    );
  });
  test('validateBody response object', () => {
    validateBody().isToBeForwarded().sendErrorCode(500).debug(false).addParams([
      param('test').isNumber().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'forward', errorCode: 500, debug: false }
    );
  });
  test('validateBody response object empty', () => {
    validateBody().addParams([
      param('test').isNumber().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], {}
    );
  });
  test('validateBody validator object isNumber', () => {
    validateBody().addParams([
      param('test').isNumber().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
      }], {}
    );
  });
  test('validateBody validator object isNumber and min max ranges', () => {
    validateBody().addParams([
      param('test').minimumNumber(1).maximumNumber(10).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isNumber: true,
        range: { min: 1, max: 10 }
      }], {}
    );
  });
  test('validateBody validator object isBoolean', () => {
    validateBody().addParams([
      param('test').isBoolean().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isBoolean: true,
      }], {}
    );
  });
  test('validateBody validator object isRequired', () => {
    validateBody().addParams([
      param('test').isRequired().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isRequired: true,
      }], {}
    );
  });
  test('validateBody validator object isArray', () => {
    validateBody().addParams([
      param('test').isArray().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isArray: true,
      }], {}
    );
  });
  test('validateBody validator object isArray and object child', () => {
    validateBody().addParams([
      param('test').isArray().addChildren([
        param('child1').isObject().addChild(
          param('child11').isNumber().end()
        ).end(),
        param('child2').isObject().addChild(
          param('child21').isNumber().end()
        ).end()
      ]).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
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
            param('child111').isNumber().end()
          ).end()
        ).end(),
        param('child2').isObject().addChild(
          param('child21').isNumber().end()
        ).end()
      ]).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
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
  test('validateBody validator object shouldInclude', () => {
    validateBody().addParams([
      param('test').shouldInclude(['a','b']).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        includes: ['a','b'],
      }], {}
    );
  });
  test('validateBody validator object shouldExclude', () => {
    validateBody().addParams([
      param('test').shouldExclude(['a','b']).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        excludes: ['a','b'],
      }], {}
    );
  });
  test('validateBody validator object isObject', () => {
    validateBody().addParams([
      param('test').isObject().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isObject: true,
      }], {}
    );
  });
  test('validateBody validator object customValidator', () => {
    const validatorfn = jest.fn();
    validateBody().addParams([
      param('test').customValidator(validatorfn).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        customValidator: validatorfn,
      }], {}
    );
  });
  test('validateBody validator object isEmail', () => {
    validateBody().addParams([
      param('test').isEmail().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isEmail: true,
      }], {}
    );
  });
  test('validateBody validator object isDate', () => {
    validateBody().addParams([
      param('test').isDate().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isDate: true,
      }], {}
    );
  });
  test('validateBody validator object Date Format', () => {
    validateBody().addParams([
      param('test').dateFormat('MM-DD-YYYY').end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        isDate: true,
        format: 'MM-DD-YYYY',
      }], {}
    );
  });
  test('validateBody validator object length', () => {
    validateBody().addParams([
      param('test').minimumLength(2).maximumLength(5).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        length: { min: 2, max: 5 }
      }], {}
    );
  });
  test('validateBody validator object mobile number countryCode', () => {
    validateBody().addParams([
      param('test').isMobileNumberWithCountryCode('91').end()
    ]).done();
    expect(validator).toBeCalledWith('body',
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
      param('test').isMobileNumberWithCountryCode('91').isMobileNumberWithCountryCodeMandatory().end()
    ]).done();
    expect(validator).toBeCalledWith('body',
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
      param('test').isMobileNumberWithMaximumLength(10).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
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
      param('test').isMobileNumberWithMinimumLength(1).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
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
      param('test').isMobileNumberWithMinimumLength(1).isMobileNumberWithMaximumLength(10).end()
    ]).done();
    expect(validator).toBeCalledWith('body',
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
      param('test').sendErrorMessage('Invalid Data').end()
    ]).done();
    expect(validator).toBeCalledWith('body',
      [{
        param: 'test',
        message: 'Invalid Data',
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
      param('test').isNumber().end()
    ]).done();
    expect(validator).toBeCalledWith('params',
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
      param('test').isNumber().end()
    ]).done();
    expect(validator).toBeCalledWith('query',
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
      param('test').isNumber().end()
    ]).done();
    expect(validator).toBeCalledWith('headers',
      [{
        param: 'test',
        isNumber: true,
      }], { mode: 'forward', errorCode: 500, debug: false }
    );
  });
});
