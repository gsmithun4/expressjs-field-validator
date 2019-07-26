const _ = require('lodash');
const moment = require('moment');

module.exports = (validation = [], response = {}) => {
  const validator = (() => {
    const validate = (validation, req) => {
      const errorList = [];
      const { param, location, children, isArray, isObject } = validation;
      const getValue = (fieldValue, subParam) => {
        if (fieldValue)
          return fieldValue[subParam];

        switch (location) {
          case 'body':
            return req.body[param];
            break;
          case 'params':
            return req.params[param];
            break;
          case 'query':
            return req.query[param];
            break;
          default:
            return;
            break;
        }
      }
      const checkEmpty = (value) => {
        //Checking if value is empty
        if (_.isObject(value)) {
          //Array or Object
          if (Array.isArray(value)) {
            //Array
            if (!value || JSON.stringify(value).length === 2)
              return true;

          } else {
            //Object
            if (!value || JSON.stringify(value).length === 2)
              return true;
          }

        } else if (isNaN(value) && !_.isBoolean(value) && (!value || value === 'undefined')) {
          //Not Number Not Boolean => String
          return true;
        }
        return false;
      }
      const checkFormat = (value, validateObj) => {
        const { param, location, isRequired, isNumber, isEmail, isBoolean,
          length, message, isDate, format, isArray, isObject, regEx, range, includes, excludes } = validateObj;

        const validateRegEx = (regex) => {
          return regex instanceof RegExp;
        }
        const testRegEx = (regex, value) => {
          return regex.test(value);
        }
        const validateEmail = () => {
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return testRegEx(re, String(value).toLowerCase());
        }
       
        try {
          const isEmpty = checkEmpty(value);
          if (isRequired) {
            if (isEmpty) {
              throw 'Required';
            }
          }
          if (!isEmpty) {
            if (regEx) {
              if (!validateRegEx(regEx))
                throw 'Invalid RegEx';
              if (!testRegEx(regEx))
                throw `Not Matching to Reg Ex :: ${regEx.toString()}`;
            }
            if (isNumber) {
              if (isNaN(value))
                throw 'Must Be A Number';
              if (range) {
                if (!isNaN(range.min) && range.min > value) 
                  throw `Mininum Range Must Be ${range.min}`;
                if (!isNaN(range.max) && range.max < value) 
                throw `Maximum Range Must Be ${range.max}`;
              }
            }

            if (isEmail && !validateEmail())
              throw 'Must Be A Email Id';

            if (length) {
              let varVal = value;
              if (!isNaN(varVal)) {
                varVal = varVal.toString();
              }
              if (length.min && varVal.length < length.min) {
                throw `Mininum Length Must Be ${length.min}`;
              }
              if (length.max && varVal.length > length.max) {
                throw `Maximum Length Must Be ${length.max}`;
              }
            }
            if (isArray && !Array.isArray(value)) {
              throw 'Must Be An Array';
            }
            if (isObject && !_.isObject(value) && Array.isArray(value)) {
              throw 'Must Be An Object';
            }
            if (isDate) {
              if (!moment(value, format || 'YYYY-MM-DD').isValid()) {
                throw `Must Be A Date With Format ${format || 'YYYY-MM-DD'}`;
              }
            }
            if (isBoolean) {
              if (!_.isBoolean(value) && value.toLowerCase() !== "true" && value.toLowerCase() !== "false") {
                throw 'Must Be A Boolean';
              }
            }
            if (includes && Array.isArray(includes) && includes.length > 0 && !includes.includes(value)) {
              throw `Must In ${includes.toString()}`;
            }
            if (excludes && Array.isArray(excludes) && excludes.length > 0 && excludes.includes(value)) {
              throw `Must Not Be In ${excludes.toString()}`;
            }
          }

        } catch (err) {
          return { location, param, message : `${message || 'Invalid Field Error'}${response.debg ? (` :: ${value && value.toString()} : ${err}`) : ''}` };
        }
      }
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
      }
      const getChildArrayErrors = (child, value) => {
        return value.map(v => {
          return child.map(c => {
            const subvalue = getValue(v, c.param);
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
        });
      }
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
    }
    const validateFields = (req, res, next) => {
      const error = _.reject(_.flattenDeep(validation.map(validateObj => validate(validateObj, req))), _.isNil);
      if (error && error.length > 0) {
        
        if (response.mode === 'forward') {
          res.locals.statusCode = response.errorCode || 422;
          res.locals.data = { error };
          return next();

        } else // Reject
          return res.status(response.errorCode || 422).send({ error });

      } else
        return next();
    }
    return { validateFields };
  })();
  return validator.validateFields;
}
