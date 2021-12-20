'use strict';

const validator = require('../validator');

const validateOps = () => {
  const isRequired = (validationObject) => {
    validationObject.isRequired = true;
  };
  const addChild = (validationObject, child) => {
    validationObject.children = validationObject.children || [];
    validationObject.children.push(child);
  };
  const addChildren = (validationObject, children) => {
    validationObject.children = validationObject.children || [];
    validationObject.children.push(...children);
  };
  const isArray = (validationObject) => {
    validationObject.isArray = true;
  };
  const setIncludesExcludes = (validationObject, options = {}) => {
    if (options.includes) {
      validationObject.includes = options.includes;
    }
    if (options.excludes) {
      validationObject.excludes = options.excludes;
    }
  };
  const isObject = (validationObject) => {
    validationObject.isObject = true;
  };
  const isEmail = (validationObject) => {
    validationObject.isEmail = true;
  };
  const isBoolean = (validationObject) => {
    validationObject.isBoolean = true;
  };
  const setDateOptions = (validationObject, format) => {
    validationObject.isDate = true;
    validationObject.format = format;
  };
  const setNumberOptions = (validationObject, options = {}) => {
    validationObject.isNumber = true;
    if (options.min || options.max) {
      validationObject.range = validationObject.range || {};
    }
    if (options.min) {
      validationObject.range.min = options.min;
    }
    if (options.max) {
      validationObject.range.max = options.max;
    }
  };
  const setLengthOptions = (validationObject, options = {}) => {
    validationObject.length = validationObject.length || {};
    if (options.min) {
      validationObject.length.min = options.min;
    }
    if (options.max) {
      validationObject.length.max = options.max;
    }
  };
  const setMobileNumberOptions = (validationObject, options = {}) => {
    validationObject.mobileNumber = validationObject.mobileNumber || { length: {} };
    if (options.countryCode) {
      validationObject.mobileNumber.countryCode = options.countryCode;
    }
    if (options.isCountryCodeMandatory) {
      validationObject.mobileNumber.isCountryCodeMandatory = options.isCountryCodeMandatory;
    }
    if (options.length && options.length.min) {
      validationObject.mobileNumber.length.min = options.length.min;
    }
    if (options.length && options.length.max) {
      validationObject.mobileNumber.length.max = options.length.max;
    }
  };
  const sendErrorMessage = (validationObject, message) => {
    validationObject.message = message;
  };
  const setMode = (validationObject, mode) => {
    validationObject.mode = mode;
  };
  const setErrorCode = (validationObject, errorCode) => {
    validationObject.errorCode = errorCode;
  };
  const setDebug = (validationObject, debug) => {
    validationObject.debug = debug;
  };
  
  return {
    isRequired,
    addChild,
    addChildren,
    setIncludesExcludes,
    isArray,
    isObject,
    isEmail,
    isBoolean,
    setDateOptions,
    setNumberOptions,
    sendErrorMessage,
    setMode,
    setErrorCode,
    setDebug,
    setMobileNumberOptions,
    setLengthOptions,
  };
};
const operations = validateOps();
const validateBody = () => {
  return responseConfigs('body');
};
const validateParam = () => {
  return responseConfigs('params');
};
const validateQuery = () => {
  return responseConfigs('query');
};
const validateHeader = () => {
  return responseConfigs('headers');
};
const responseConfigs = (location) => {
  const responseObject = {};
  const isToBeRejected = () => {operations.setMode(responseObject, 'reject'); return responseConfigsObj;};
  const isToBeForwarded = () => {operations.setMode(responseObject, 'forward'); return responseConfigsObj;};
  const sendErrorCode = (errorCode) => {operations.setErrorCode(responseObject, errorCode); return responseConfigsObj;};
  const debug = (isDebug) => {operations.setDebug(responseObject, !!isDebug); return responseConfigsObj;};
  const addParams = (paramList) => addParamList(paramList, location, responseObject);

  const responseConfigsObj = {
    isToBeRejected,
    isToBeForwarded,
    sendErrorCode,
    debug,
    addParams,
  };
  return responseConfigsObj;
};
const addParamList = (paramList, location, responseObject) => {
  return fieldProperties(location, responseObject).addChildren(paramList);
};
const setParam = (param) => {
  return fieldProperties().param(param);
};
const fieldProperties = (location, responseObj) => {
  const validationObject = {};
  if (location) {
    validationObject.location = location;
  }
  const responseObject = responseObj; 

  const param = (par) => {validationObject.param = par; return fieldFunctions;};
  const isRequired = () => {operations.isRequired(validationObject); return fieldFunctions;};
  const done = () => validator(validationObject.location, validationObject.children, responseObject);
  const end = () => validationObject;
  const addChild = (child) => {operations.addChild(validationObject, child); return fieldFunctions;};
  const addChildren = (children) => {operations.addChildren(validationObject, children); return fieldFunctions;};
  const isArray = () => {operations.isArray(validationObject); return fieldFunctions;};
  const shouldInclude = (includes) => {operations.setIncludesExcludes(validationObject, { includes }); return fieldFunctions;};
  const shouldExclude = (excludes) => {operations.setIncludesExcludes(validationObject, { excludes }); return fieldFunctions;};
  const isObject = () => {operations.isObject(validationObject); return fieldFunctions;};
  const isEmail = () => {operations.isEmail(validationObject); return fieldFunctions;};
  const isBoolean = () => {operations.isBoolean(validationObject); return fieldFunctions;};
  const isDate = () => {operations.setDateOptions(validationObject); return fieldFunctions;};
  const dateFormat = (format) => {operations.setDateOptions(validationObject, format); return fieldFunctions;};
  const isNumber = () => {operations.setNumberOptions(validationObject); return fieldFunctions;};
  const minimumNumber = (min) => {operations.setNumberOptions(validationObject, { min }); return fieldFunctions;};
  const maximumNumber = (max) => {operations.setNumberOptions(validationObject, { max }); return fieldFunctions;};
  const sendErrorMessage = (message) => {operations.sendErrorMessage(validationObject, message); return fieldFunctions;};
  const minimumLength = (min) => {operations.setLengthOptions(validationObject, { min }); return fieldFunctions;};
  const maximumLength = (max) => {operations.setLengthOptions(validationObject, { max }); return fieldFunctions;};
  const isMobileNumberWithCountryCode = (countryCode) => {operations.setMobileNumberOptions(validationObject, { countryCode }); return fieldFunctions;};
  const isMobileNumberWithCountryCodeMandatory = () => {operations.setMobileNumberOptions(validationObject, { isCountryCodeMandatory: true }); return fieldFunctions;};
  const isMobileNumberWithMinimumLength = (min) => {operations.setMobileNumberOptions(validationObject, { length: { min } }); return fieldFunctions;};
  const isMobileNumberWithMaximumLength = (max) => {operations.setMobileNumberOptions(validationObject, { length: { max } }); return fieldFunctions;};
  
  const fieldFunctions = {
    done,
    isRequired,
    addChild,
    addChildren,
    isArray,
    isObject,
    isEmail,
    isBoolean,
    isDate,
    isNumber,
    sendErrorMessage,
    dateFormat,
    minimumNumber,
    maximumNumber,
    minimumLength,
    maximumLength,
    end,
    shouldInclude,
    shouldExclude,
    isMobileNumberWithCountryCode,
    isMobileNumberWithCountryCodeMandatory,
    isMobileNumberWithMinimumLength,
    isMobileNumberWithMaximumLength,
  };
  return {
    addChildren,
    param,
  };
};

module.exports = {
  validateBody,
  validateParam,
  validateQuery,
  validateHeader,
  param: setParam,
};
