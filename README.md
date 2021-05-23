# expressjs-field-validator
Plugin for validating field values of json request in expressjs

[![Dependency Status](https://david-dm.org/gsmithun4/expressjs-field-validator.svg)](https://david-dm.org/gsmithun4/expressjs-field-validator)
[![Dev Dependency Status](https://status.david-dm.org/gh/gsmithun4/expressjs-field-validator.svg?type=dev)](https://david-dm.org/gsmithun4/expressjs-field-validator?type=dev)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=bugs)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![code_smells](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=code_smells)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![coverage](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=coverage)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![ncloc](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=ncloc)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![alert_status](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=alert_status)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=security_rating)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=security_rating)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![sqale_index](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=sqale_index)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
[![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=gsmithun4_expressjs-field-validator&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=gsmithun4_expressjs-field-validator)
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Installation](#installation)
- [Dependencies](#dependencies)
- [How To Use](#how-to-use)
- [validator arguments](#validator-arguments)
  - [validator Object](#validator-object)
    - [Nested Objets](#nested-objets)
  - [Response object](#response-object)
    - [Mode](#mode)
      - [Reject](#reject)
      - [Forward](#forward)
    - [debug](#debug)
- [checkService](#checkservice)
  - [Usage](#usage)
- [skipService](#skipservice)
  - [Arguments](#arguments)
  - [Usage](#usage-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Installation  
```
$ npm install expressjs-field-validator
```

## Dependencies
 - [lodash](https://www.npmjs.com/package/lodash)
 - [moment](https://www.npmjs.com/package/moment)

## How To Use

```js
 const { validator } = require('expressjs-field-validator');
```
```js
router.get('/users/:id',
validator([{param : 'id', location : 'params', isRequired : true}], { mode : 'reject', errorCode : '422' }),
(req, res, next) => {

  // Main Service Here

});
```
## validator arguments

| Argument        | Type      | Description
|:---------------|:---------:|----------------------------|
|validator	  |`Object[]`   |  Array of validation object |
|Response	  |`Object`   |  This Object determines the proceeding to the next step |

### validator Object


| Property        | Type      | Description
|:---------------|:---------|----------------------------|
|param	  |`String`   | Field name|
|location	  |`String`   | Location of the field (`body`/`params`/`query`) only mandatory for higher order objects (direclty under `body`/`params`/`query`) default `body` |
|children	  |`Object[]`   |Array of Child validator objects, only applicable if the field is `Array` or `Object`  |
|isArray	  |`Boolean`   |The value is `Array` or not (default `false`)|
|isObject	  |`Boolean`   |The value is `Object` or not (default `false`)|
|isRequired	  |`Boolean`   |The value is mandatory or not (default `false`)|
|isNumber	  |`Boolean`   |The value is `Number` or not (default `false`)|
|range	  |`Object`   |Object `{min : 1, max : 10}` describes minimum and maximum value of a Number field|
|isEmail	  |`Boolean`   |The value is `Email` or not (default `false`)|
|isBoolean	  |`Boolean`   |The value is `Boolean` or not (default `false`)|
|isDate	  |`Boolean`   |The value is `Date` or not (default `false`)|
|format	  |`String`   |Date format. Please reffer https://momentjs.com/docs/ for date formats|
|mobileNumber	  |`Object`   |Object `{countryCode : '91', isCountryCodeMandatory : true, length: {min : 1, max : 10}}` ,describes characteristics of mobile number, length is the length range of mobile number excluding country code |
|length	  |`Object`   |Object `{min : 1, max : 10}` describes minimum and maximum length|
|includes	  |`Object[]`   |Value must be one of the element in the array|
|excludes	  |`Object[]`   |Value must not be one of the element in the array|
|message	  |`String`   |Error message thrown in case of test fails default : Invalid Field Error|

#### Nested Objets
In case of `Object` or `Array`, `isArray` or `isObject` must be true
if json structure is
```js
{
  "page" : {
    "sorted" : "True"
  },
  "sort" : [{
    "value" : [{
	"date" : "2019-01-01",
	"length" : {"min" : "1", "max" : "100"}
    }]
  }]
}
```
the validator object
```js
[
  {param : 'page', location : 'body', isObject : true, children : [
    {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true, message='Mandatory field page missing'},
  ]},
  {param : 'sort', location : 'body', isArray : true, children : [
    {param : 'value', location : 'body.sort', isArray : true, children : [
      {param : 'date', location : 'body.sort.value', isRequired : true, isDate : true},
      {param : 'length', location : 'body.sort.value', isObject : true, children : [
        {param : 'min', location : 'body.sort.value.length', isNumber : true},
        {param : 'max', location : 'body.sort.value.length', isNumber : true}
      ]}
    ]}
  ]}
 ]
```
### Response object

| Property        | Type      | Description
|:---------------|:---------|----------------------------|
|mode	  |`String`   | can be `reject` or `forward`, Mandatory field|
|errorCode	  |`String`   | Error code send in response. default `422` Error|
|debug	  |`Boolean`   | set `true` to respond back more details on error |

#### Mode
Value can be can be `reject` or `forward`.
##### Reject
Response is sent back with http status code provided in `errorCode` property
```js
{
    "error": [
        {
            "location": "body.sort",
            "param": "sort",
            "message": "Invalid Field Error"
        }
    ]
}
```
##### Forward
Error is set to `request.locals.data` and error code to `request.locals.statusCode`. Forward the request to next middleware.

#### debug
If `debug` is set to `true`, error response will be
```js
{
    "error": [
        {
            "location": "body.sort",
            "param": "sort",
            "message": "Invalid Field Error :: somevalueforsort Must Be A Boolean"
        }
    ]
}
```
It will give more idea about the error.

## checkService
```js
 const { checkService } = require('expressjs-field-validator');
```

It helps to skip the main service function, if you have used forward mode.
### Usage
Pass your service function to `checkService`, which must be skipped.
```js
checkService((req, resp, next) => {
  
})
```
```js
router.get('/users/:id',
validator([{param : 'id', location : 'params', isRequired : true, isNumber: true}], { mode : 'forward' }),
checkService((req, res, next) => {

  // This middleware is skipped if id is empty or not a number
  
}),
(req, res, next) => {

  // This middleware Will not be skipped, error data will be availble here - req.locals.data and status code - request.locals.statusCode here 
  
});
```

## skipService
```js
 const { skipService } = require('expressjs-field-validator');

 skipService(req, 'SOME-ERROR');
```
### Arguments
| Property        | Type      | Description
|:---------------|:---------|----------------------------|
|req	  |`Object`   | Pass the request object|
|statusCode	  |`String`   | Some status code to identify the error. Read the data from `request.locals.statusCode` |

It helps to skip the main service function manually.
### Usage
Pass your service function to `checkService`, which must be skipped. Use `skipService` in the middleware which is added before the main service
```js
[
  (req, resp, next) => {
    skipService(req, 'SOME-ERROR');
    next();
  },
  checkService((req, resp, next) => {
    // This will be skipped
  }),
  (req, resp, next) => {
    // This will not be skipped
  }
]
```

