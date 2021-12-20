# expressjs-field-validator
Request field validator for expressjs

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
<!-- **Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)* -->

- [Installation](#installation)
- [How To Use](#how-to-use)
- [Getting Started](#getting-started)
  - [Defining a Field](#defining-a-field)
    - [Available Options](#available-options)
      - [isRequired()](#isrequired)
      - [isArray()](#isarray)
      - [isObject()](#isobject)
      - [isNumber()](#isnumber)
      - [isEmail()](#isemail)
      - [isBoolean()](#isboolean)
      - [isDate()](#isdate)
      - [dateFormat(format)](#dateformatformat)
      - [minimumNumber(min)](#minimumnumbermin)
      - [maximumNumber(max)](#maximumnumbermax)
      - [minimumLength(min)](#minimumlengthmin)
      - [maximumLength(max)](#maximumlengthmax)
      - [shouldInclude(inclues)](#shouldincludeinclues)
      - [shouldExclude(excludes)](#shouldexcludeexcludes)
      - [isMobileNumberWithCountryCode(countryCode)](#ismobilenumberwithcountrycodecountrycode)
      - [isMobileNumberWithCountryCodeMandatory()](#ismobilenumberwithcountrycodemandatory)
      - [isMobileNumberWithMinimumLength(min)](#ismobilenumberwithminimumlengthmin)
      - [isMobileNumberWithMaximumLength(max)](#ismobilenumberwithmaximumlengthmax)
      - [addChild(child)](#addchildchild)
      - [addChildren(children)](#addchildrenchildren)
      - [sendErrorMessage(message)](#senderrormessagemessage)
      - [end() :bangbang::bangbang: Mandatory](#end-bangbangbangbang-mandatory)
  - [Creating a validation middleware](#creating-a-validation-middleware)
    - [Available Options](#available-options-1)
      - [isToBeRejected()](#istoberejected)
      - [isToBeForwarded()](#istobeforwarded)
        - [checkService](#checkservice)
        - [skipService](#skipservice)
      - [sendErrorCode(errorCode)](#senderrorcodeerrorcode)
      - [debug(isDebugEnabled)](#debugisdebugenabled)
      - [addParams(paramList)](#addparamsparamlist)
      - [done() :bangbang::bangbang: Mandatory](#done-bangbangbangbang-mandatory)
- [Dealing with nested objects](#dealing-with-nested-objects)
  - [Request body](#request-body)
  - [Validation](#validation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Installation  
```
$ npm install expressjs-field-validator
```

## How To Use

```js
 const { 
  validateBody,
  validateParam,
  validateQuery,
  param,
} = require('expressjs-field-validator');
```
```js
router.post('/users/:id',
validateParam().addParams([
  param('id').isNumber().end()
]).done(),
validateBody().addParams([
  param('userId').isNumber().end()
]).done(),
validateQuery().addParams([
  param('userName').isRequired().end()
]).done(),
validateHeader().addParams([
  param('Authorization').isRequired().end()
]).done(),
(req, res, next) => {

  // Main Service Here

});
```
## Getting Started
### Defining a Field
Use `param(<field Name>)` to define a field. It should end with `end()`
```js
param('userName').isRequired().end()
```
Defines a field `userName` which is mandatory.
#### Available Options
##### isRequired()
Field is mandatory
##### isArray()
Expects array
##### isObject()
Expects object
##### isNumber()
Expects number
##### isEmail()
Expects email
##### isBoolean()
Expects boolean value
##### isDate()
Expects a date with default format `YYYY-MM-DD`
##### dateFormat(format)
* `format` *Mandatory* String
specify date format, supported
```
YYYY-MM-DD
DD-MM-YYYY'
MM-DD-YYYY'
YYYY/MM/DD'
DD/MM/YYYY'
MM/DD/YYYY'
```
##### minimumNumber(min)
* `min` *Mandatory* Number
Expects number and must be greater than or equal to `min`
##### maximumNumber(max)
* `max` *Mandatory* Number
Expects number and must be less than or equal to `max`
##### minimumLength(min)
* `min` *Mandatory* Number
Expects number/string and length must be less than or equal to `min`
##### maximumLength(max)
* `max` *Mandatory* Number
Expects number/string and length must be less than or equal to `max`
##### shouldInclude(inclues)
* `inclues` *Mandatory* Array
Expects number/string and must be one of given array `includes`
##### shouldExclude(excludes)
* `excludes` *Mandatory* Array
Expects number/string and must not be one of given array `excludes`
##### isMobileNumberWithCountryCode(countryCode)
* `countryCode` *Mandatory* String
Expects mobile number with or without `countryCode`
##### isMobileNumberWithCountryCodeMandatory()
Expects mobile number which should starts with country code set at `isMobileNumberWithCountryCode`
##### isMobileNumberWithMinimumLength(min)
* `min` *Mandatory* Number
Minimum length of mobile number without country code
##### isMobileNumberWithMaximumLength(max)
* `max` *Mandatory* Number
Maximum length of mobile number without country code
##### addChild(child)
* `child` *Mandatory* field definition object
Add a child object for arrays and objects
##### addChildren(children)
* `children` *Mandatory* Array of field definition objects
Add a list of children objects for arrays and objects
##### sendErrorMessage(message)
* `message` *Mandatory* String
Custom message to be send back in case of validation failure
```js
// Default message
{
    "error": [
        {
            "location": "body.sort",
            "param": "sort",
            "message": "Invalid Field Error"
        }
    ]
}
// Custom message
{
    "error": [
        {
            "location": "body.sort",
            "param": "sort",
            "message": "<Your Custom Error Message>"
        }
    ]
}
```
##### end() :bangbang::bangbang: Mandatory
Ends a param definition 

### Creating a validation middleware
* `validateBody()` *Validate body*
* `validateParam()` *Validate param*
* `validateQuery()` *Validate query*
* `validateHeader()` *Validate header*

#### Available Options
##### isToBeRejected()
Defines the validation failure event - Server returns http status code set via `sendErrorCode` (default 422), :heavy_exclamation_mark: will not proceed to the next middleware
Response body
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
##### isToBeForwarded()
Defines the validation failure event - Error is set to `request.locals.data` and error code to `request.locals.statusCode`, :white_check_mark: will proceed to the next middleware
Error object
Response body
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
###### checkService
```js
  const { checkService } = require('expressjs-field-validator');
```
Pass middleware to `checkService`, which must be skipped if `isToBeForwarded` enabled and validation errors are found
```js
router.get('/users/:id',
validateBody().isToBeForwarded().sendErrorCode(500).debug(false).addParams([
  param('id').isRequired().isNumber().end()
]).done(),
checkService((req, res, next) => {

  // This middleware is skipped if id is empty or not a number
  
}),
(req, res, next) => {

  // This middleware Will not be skipped, error data will be availble here - req.locals.data and status code - request.locals.statusCode here 
  
});
```
###### skipService
manually invoke forward mode, if this is set from any middleware, the middlewares wrapped inside `checkService` won't be executed
```js
 const { skipService } = require('expressjs-field-validator');
```
```js
router.get('/users/:id',
(req, res, next) => {

  skipService(req, 'SOME-ERROR');
  next();
  
}),
 
checkService((req, res, next) => {

  // This middleware is skipped
  
}),
(req, res, next) => {

  // This middleware Will not be skipped, error data will be availble here - req.locals.data and status code - request.locals.statusCode here 
  
});
```
##### sendErrorCode(errorCode)
* `errorCode` *Mandatory* Error code which should be rejected
##### debug(isDebugEnabled)
* `isDebugEnabled` *Mandatory* Pass `true` for development environments, the error object will contain more details about error
Error object
```js
{
    "error": [
        {
            "location": "body.sort",
            "param": "sort",
            "message": "Invalid Field Error :: somevalueforsort Must Be A Boolean" // More details on error
        }
    ]
}
```
##### addParams(paramList)
* `paramList` *Mandatory* Array of field definition objects
##### done() :bangbang::bangbang: Mandatory
Ends a validation definition
## Dealing with nested objects
### Request body
```js
{
  "field1": "Value", // String, Mandatory
  "field2": [ // array, Mandatory
    { "field21": "44443" } // Number Optional
  ],
  "field3": { // Object Optional
    { "field31": "true" } // Boolean Mandatory
    { "field32": "String" } // String Mandatory
  }
}
```
Should send http status code 500 in case of error
### Validation
```js
router.post('/users/:id',
validateBody().isToBeRejected().sendErrorCode(500).addParams([
  param('field1').isRequired().end(),
  param('field2').isRequired().isArray().isRequired().addChild(
    param('field21').isNumber().end()
  ).end(),
  param('field3').isRequired().isObject().addChildren([
    param('field31').isBoolean().isRequired().end(),
    param('field32').isRequired().end()
  ]).end(),
]).done(),
(req, res, next) => {

  // Main Service Here

});
```
