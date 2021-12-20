const { validateBody } = require('./queryBuilder');
const validator = require('../validator');
jest.mock('../validator');

describe('Test for validateBody', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('validateBody response object', () => {
    validateBody().isToBeRejected().sendErrorCode(500).debug(true).param('test').isNumber().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isNumber: true,
        range: {}
      }, { mode: 'reject', errorCode: 500, debug: true }
    );
  });
  test('validateBody response object', () => {
    validateBody().isToBeForwarded().sendErrorCode(500).debug(false).param('test').isNumber().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isNumber: true,
        range: {}
      }, { mode: 'forward', errorCode: 500, debug: false }
    );
  });
  test('validateBody response object empty', () => {
    validateBody().param('test').isNumber().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isNumber: true,
        range: {}
      }, {}
    );
  });
  test('validateBody validator object isNumber', () => {
    validateBody().param('test').isNumber().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isNumber: true,
        range: {}
      }, {}
    );
  });
  test('validateBody validator object isNumber and min max ranges', () => {
    validateBody().param('test').minimumNumber(1).maximumNumber(10).done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isNumber: true,
        range: { min: 1, max: 10 }
      }, {}
    );
  });
  test('validateBody validator object isBoolean', () => {
    validateBody().param('test').isBoolean().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isBoolean: true,
      }, {}
    );
  });
  test('validateBody validator object isRequired', () => {
    validateBody().param('test').isRequired().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isRequired: true,
      }, {}
    );
  });
  test('validateBody validator object isArray', () => {
    validateBody().param('test').isArray().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isArray: true,
      }, {}
    );
  });
  test('validateBody validator object shouldInclude', () => {
    validateBody().param('test').shouldInclude(['a','b']).done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        includes: ['a','b'],
      }, {}
    );
  });
  test('validateBody validator object shouldExclude', () => {
    validateBody().param('test').shouldExclude(['a','b']).done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        excludes: ['a','b'],
      }, {}
    );
  });
  test('validateBody validator object isObject', () => {
    validateBody().param('test').isObject().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isObject: true,
      }, {}
    );
  });
  test('validateBody validator object isEmail', () => {
    validateBody().param('test').isEmail().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isEmail: true,
      }, {}
    );
  });
  test('validateBody validator object isDate', () => {
    validateBody().param('test').isDate().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isDate: true,
      }, {}
    );
  });
  test('validateBody validator object Date Format', () => {
    validateBody().param('test').dateFormat('MM-DD-YYYY').done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        isDate: true,
        format: 'MM-DD-YYYY',
      }, {}
    );
  });
  test('validateBody validator object length', () => {
    validateBody().param('test').minimumLength(2).maximumLength(5).done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        length: { min: 2, max: 5 }
      }, {}
    );
  });
  test('validateBody validator object mobile number countryCode', () => {
    validateBody().param('test').isMobileNumberWithCountryCode('91').done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        mobileNumber: { 
          countryCode: '91',
          length: {}
        }
      }, {}
    );
  });
  test('validateBody validator object mobile number isCountryCodeMandatory', () => {
    validateBody().param('test').isMobileNumberWithCountryCode('91').isMobileNumberWithCountryCodeMandatory().done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        mobileNumber: { 
          countryCode: '91',
          isCountryCodeMandatory: true,
          length: {}
        }
      }, {}
    );
  });
  test('validateBody validator object mobile number isMobileNumberWithMaximumLength', () => {
    validateBody().param('test').isMobileNumberWithMaximumLength(10).done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        mobileNumber: { 
          length: { max: 10 }
        }
      }, {}
    );
  });
  test('validateBody validator object mobile number isMobileNumberWithMinimumLength', () => {
    validateBody().param('test').isMobileNumberWithMinimumLength(1).done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        mobileNumber: { 
          length: { min: 1 }
        }
      }, {}
    );
  });
  test('validateBody validator object mobile number length range', () => {
    validateBody().param('test').isMobileNumberWithMinimumLength(1).isMobileNumberWithMaximumLength(10).done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        mobileNumber: { 
          length: { min: 1, max: 10 }
        }
      }, {}
    );
  });
  test('validateBody validator object Error message', () => {
    validateBody().param('test').sendErrorMessage('Invalid Data').done();
    expect(validator).toBeCalledWith(
      {
        children: [],
        param: 'test',
        location: 'body',
        message: 'Invalid Data',
      }, {}
    );
  });
});
