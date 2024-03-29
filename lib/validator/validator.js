'use strict';

module.exports = (location = 'body', validation = [], response = {}) => {
  const validator = (() => {
    const validate = (validation, req) => {
      const errorList = [];
      const { param, children, isArray, isObject } = validation;
      const getValue = (fieldValue, subParam) => {
        if (fieldValue)
          return fieldValue[subParam];

        switch (location) {
          case 'body':
            return req.body[param];
          case 'params':
            return req.params[param];
          case 'query':
            return req.query[param];
          case 'locals':
            return req.locals[param];
          case 'headers':
            return req.headers[param];
          default:
            return req.body[param];
        }
      };
      const checkEmpty = (value) => {
        //Checking if value is empty
        if (value instanceof Object) {
          //Array or Object 
          if (!value || JSON.stringify(value).length === 2) {
            return true;
          }

        } else if (isNaN(value) && value !== !!value && (!value || value === 'undefined' || value.trim() === '')) {
          //Not Number Not Boolean => String
          return true;
        }
        return false;
      };
      const checkFormat = (value, validateObj) => {
        const { param, isRequired, isNumber, isEmail, isBoolean,
          length, message, isDate, format, isArray, isObject, range, 
          includes, excludes, mobileNumber, customValidator } = validateObj;

        const testRegEx = (regex, value) => {
          return regex.test(value);
        };
        const validateEmail = () => {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return testRegEx(re, String(value).toLowerCase());
        };
        const getErrorMessage = (err) => {
          return `${(message && message.toString().replace(/#value/g, value ? value.toString() : '')) || 'Invalid Field Error'}${response.debug ? (` :: ${value && value.toString()} : ${err}`) : ''}`;
        };
        const lengthCheck = (length, value) => {
          if (length) {
            let varVal = value;
            if (!isNaN(varVal)) {
              varVal = varVal.toString();
            }
            if (length.min && varVal.length < length.min) {
              throw new Error(`Mininum Length Must Be ${length.min}`);
            }
            if (length.max && varVal.length > length.max) {
              throw new Error(`Maximum Length Must Be ${length.max}`);
            }
          }
        };

        const dateCheck = (dateString, format) => {
          if (!dateString || !format) {
            return false;
          }
          let regEx = /^\d{4}\/\d{2}\/\d{2}$/;
          let YYYY,MM,DD;

          switch (format) {
            case 'YYYY-MM-DD': 
              regEx = /^\d{4}-\d{2}-\d{2}$/;
              [YYYY, MM, DD] = dateString.split('-');
              break;
            case 'DD-MM-YYYY': 
              regEx = /^\d{2}-\d{2}-\d{4}$/;
              [DD, MM, YYYY] = dateString.split('-');
              break;
            case 'MM-DD-YYYY': 
              regEx = /^\d{2}-\d{2}-\d{4}$/;
              [MM, DD, YYYY] = dateString.split('-');
              break;
            case 'YYYY/MM/DD': 
              regEx = /^\d{4}\/\d{2}\/\d{2}$/;
              [YYYY, MM, DD] = dateString.split('/');
              break;
            case 'DD/MM/YYYY': 
              regEx = /^\d{2}\/\d{2}\/\d{4}$/;
              [DD, MM, YYYY] = dateString.split('/');
              break;
            case 'MM/DD/YYYY': 
              regEx = /^\d{2}\/\d{2}\/\d{4}$/;
              [MM, DD, YYYY] = dateString.split('/');
              break;
            default:
              break;
          }

          if (!dateString.match(regEx)) { // Invalid format
            return false;
          }
          let d = new Date(`${YYYY}-${MM}-${DD}`);
          let dNum = d.getTime();
          if(!dNum && dNum !== 0) { // NaN value, Invalid date
            return false;
          } 
          return true;
        };
        const throwError = (errMsg) => {
          throw new Error(errMsg || 'customValidator error');
        };
       
        try {
          if (customValidator) {
            if (typeof customValidator !== 'function') {
              throw new Error('Configured customValidator is not a function');
            }
            customValidator(value, req, throwError);
          } 
          const isEmpty = checkEmpty(value);
          if (isRequired) {
            if (isEmpty) {
              throw new Error('Required');
            }
          }
          if (!isEmpty) {
            if (isArray && !Array.isArray(value)) {
              throw new Error('Must Be An Array');
            }
            if (isObject && (Array.isArray(value) || !(value instanceof Object))) {
              throw new Error('Must Be An Object');
            }
            if (!isArray && !isObject) {
              if (isNumber) {
                if (isNaN(value)) {
                  throw new Error('Must Be A Number');
                }
                if (range) {
                  if (!isNaN(range.min) && range.min > value) {
                    throw new Error(`Mininum Range Must Be ${range.min}`);
                  }
                  if (!isNaN(range.max) && range.max < value) {
                    throw new Error(`Maximum Range Must Be ${range.max}`);
                  }
                }
              }
  
              if (isEmail && !validateEmail()) {
                throw new Error('Must Be A Email Id');
              }
              
              lengthCheck(length, value);
              
              if (isDate) {
                const supportedFormats = [
                  'YYYY-MM-DD',
                  'DD-MM-YYYY',
                  'MM-DD-YYYY',
                  'YYYY/MM/DD',
                  'DD/MM/YYYY',
                  'MM/DD/YYYY',
                ];
                const checkDateFormat = format || 'YYYY-MM-DD';
  
                if (!supportedFormats.includes(checkDateFormat)) {
                  throw new Error(`Configured format not supported ${checkDateFormat}`);
                }
  
                if (!dateCheck(value, checkDateFormat)) {
                  throw new Error(`Must Be A Date With Format ${checkDateFormat}`);
                }
              }
              if (isBoolean) {
                if (value !== !!value && value.toLowerCase() !== 'true' && value.toLowerCase() !== 'false') {
                  throw new Error('Must Be A Boolean');
                }
              }
              if (includes && Array.isArray(includes) && includes.length > 0 && !includes.includes(value)) {
                throw new Error(`Must In ${includes.toString()}`);
              }
              if (excludes && Array.isArray(excludes) && excludes.length > 0 && excludes.includes(value)) {
                throw new Error(`Must Not Be In ${excludes.toString()}`);
              }
              if (mobileNumber) {
                if (mobileNumber.isCountryCodeMandatory && !(value.toString().startsWith(mobileNumber.countryCode) || value.toString().startsWith(`+${mobileNumber.countryCode}`))) {
                  throw new Error(`Must Not Be A Mobile Number Start With Country Code ${mobileNumber.countryCode}`);
                }
                let numberWithoutCC = value.toString();
                if (mobileNumber.countryCode) {
                  const resultArr = value.toString().split(mobileNumber.countryCode);
                  numberWithoutCC = resultArr[resultArr.length - 1];
                }
                lengthCheck(mobileNumber.length, numberWithoutCC);
              }
            }
          }

        } catch (err) {
          return { location, param, message :  getErrorMessage(err)};
        }
      };
      const getChildErrors = (child, value) => {
        return child.map(c => {
          const subvalue = getValue(value, c.param);
          const err = checkFormat(subvalue, c);
          if (err)
            return [err];

          if (subvalue && c.children) {
            if (c.isArray) {
              return getChildArrayErrors(c.children, subvalue);
            } else if (c.isObject) {
              return getChildErrors(c.children, subvalue);
            }
          }
        });
      };
      const getChildArrayErrors = (child, value) => {
        const arrayType = child[0];
        return value.map(v => {
          const err = checkFormat(v, arrayType);
          if (err)
            return [err];

          if (v && arrayType.children) {
            if (arrayType.isArray) {
              return getChildArrayErrors(arrayType.children, v);
            } else if (arrayType.isObject) {
              return getChildErrors(arrayType.children, v);
            }
          }
        });
      };
      const value = getValue();
      const errors = checkFormat(value, validation);

      if (errors)
        errorList.push(errors);

      if (errorList.length === 0 && children && !checkEmpty(value)) {
        if (isArray) {
          errorList.push(getChildArrayErrors(children, value));
        } else if (isObject) {
          errorList.push(getChildErrors(children, value));
        }
      }
      if (errorList.length > 0)
        return errorList;
    };
    const validateFields = (req, res, next) => {
      const error = validation.map(validateObj => validate(validateObj, req)).flat(Infinity).filter(obj => obj);
      if (error && error.length > 0) {
        
        if (response.mode === 'forward') {
          req.locals.statusCode = response.errorCode || 422;
          req.locals.data = { error };
          req.locals.skipService = true;
          return next();

        } else // Reject
          return res.status(response.errorCode || 422).send({ error });

      } else
        return next();
    };
    return { validateFields };
  })();
  return validator.validateFields;
};
