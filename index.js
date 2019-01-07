const _ = require('lodash');
const moment = require('moment');

module.exports = (validation = [], response) => (req, res, next) => {
  const error = _.reject(_.flattenDeep(validation.map(validateObj => validate(validateObj, req))), _.isNil);
  if (error && error.length > 0 && response) {
    if (response.mode === 'reject') {
      return res.status(response.errorCode).send({ error });

    } else if (response.mode === 'forward') {
      res.locals.statusCode = response.errorCode;
      res.locals.data = { error };
      return next();

    } else
      return next();

  } else
    return next();

}
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
      length, message, isDate, format, isArray, isObject } = validateObj;

    const validateEmail = () => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    }
    try {
      const isEmpty = checkEmpty(value);
      if (isRequired) {
        if (isEmpty) {
          throw 'Invalid Param';
        }
      }
      if (!isEmpty) {
        if (isNumber && isNaN(value))
          throw 'Invalid Param';

        if (isEmail && !validateEmail())
          throw 'Invalid Param';

        if (length) {
          let varVal = value;
          if (!isNaN(varVal)) {
            varVal = varVal.toString();
          }
          if (length.min && varVal.length < length.min) {
            throw 'Invalid Param';
          }
          if (length.max && varVal.length > length.max) {
            throw 'Invalid Param';
          }
        }
        if (isArray && !Array.isArray(value)) {
          throw 'Invalid Param';
        }
        if (isObject && !_.isObject(value) && Array.isArray(value)) {
          throw 'Invalid Param';
        }
        if (isDate) {
          if (!moment(value, format || 'YYYY-MM-DD').isValid()) {
            throw 'Invalid Param';
          }
        }
        if (isBoolean) {
          if (!_.isBoolean(value) && value.toLowerCase() !== "true" && value.toLowerCase() !== "false") {
            throw 'Invalid Param';
          }
        }
      }

    } catch (err) {
      return { location, param, message : message || 'Invalid Field Error' };
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
