# expressjs-field-validator
Request field validator for expressjs

🛠️ **[Config Builder Tool](https://expressjs-field-validator-configs-builder.onrender.com)** - Generate validation configs visually!

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
      - [convertToFormat(format)](#converttoformatformat)
      - [defaultValue(value)](#defaultvaluevalue)
      - [removeIfEmpty()](#removeifempty)
  - [Creating a validation middleware](#creating-a-validation-middleware)
    - [Available Options](#available-options-1)
      - [isToBeRejected()](#istoberejected)
      - [isToBeForwarded()](#istobeforwarded)
        - [checkService](#checkservice)
        - [skipService](#skipservice)
      - [sendErrorCode(errorCode)](#senderrorcodeerrorcode)
      - [debug(isDebugEnabled)](#debugisdebugenabled)
      - [removeIfEmpty()](#removeifempty-1)
      - [cleanUp()](#cleanup)
      - [addParams(paramList)](#addparamsparamlist)
- [Dealing with nested objects](#dealing-with-nested-objects)
  - [Request body](#request-body)
  - [Validation](#validation)
- [API Documentation Generator](#api-documentation-generator)
  - [Hosting API Documentation](#hosting-api-documentation)
- [Migration Guide](#migration-guide)
  - [Migrating from v3.x to v4.x](#migrating-from-v3x-to-v4x)
    - [Breaking Changes](#breaking-changes)
    - [New Features](#new-features)

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
  param('id').isNumber()
]),
validateBody().addParams([
  param('userId').isNumber()
]),
validateQuery().addParams([
  param('userName').isRequired()
]),
validateHeader().addParams([
  param('Authorization').isRequired()
]),
(req, res, next) => {

  // Main Service Here

});
```
## Getting Started
### Defining a Field
Use `param(<field Name>)` to define a field.
```js
param('userName').isRequired()
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
DD-MM-YYYY
MM-DD-YYYY
YYYY/MM/DD
DD/MM/YYYY
MM/DD/YYYY
```
##### convertToFormat(format)
* `format` *Mandatory* String
Converts a validated date value to the specified format. Must be used with `isDate()`. The source format is determined by `dateFormat()` (defaults to `YYYY-MM-DD` if not set).

Supported formats are the same as `dateFormat`:
```
YYYY-MM-DD
DD-MM-YYYY
MM-DD-YYYY
YYYY/MM/DD
DD/MM/YYYY
MM/DD/YYYY
```

If the specified format is not in the supported list, the conversion is silently skipped and the original value is preserved.

```js
// Convert DD/MM/YYYY input to YYYY-MM-DD
param('birthDate').isDate().dateFormat('DD/MM/YYYY').convertToFormat('YYYY-MM-DD')
// Input: "25/12/2024" → Value after validation: "2024-12-25"

// Convert with default source format (YYYY-MM-DD) to DD-MM-YYYY
param('eventDate').isDate().convertToFormat('DD-MM-YYYY')
// Input: "2024-12-25" → Value after validation: "25-12-2024"
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
Expects mobile number which should starts with the country code set with `isMobileNumberWithCountryCode`
##### isMobileNumberWithMinimumLength(min)
* `min` *Mandatory* Number
Minimum length of mobile number without country code
##### isMobileNumberWithMaximumLength(max)
* `max` *Mandatory* Number
Maximum length of mobile number without country code
##### customValidator(function)
* `function` *Mandatory* Function
A function with arguments (`value`, `req`, `error`)
`value` is the value of the field
`req` request object
`error` function with takes error message, should be called on error
```js
(value, req, error) => {
  if (value !== 100) {
    error('Invalid value customValidator');
  }
}
```
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
##### defaultValue(value)
* `value` *Mandatory* Any value (non-array, non-object)
Sets a default value for the field when the current value is `undefined`, `null`, or `''` (empty string). Only applies to fields that are not arrays or objects.
```js
param('status').defaultValue('active')
param('count').isNumber().defaultValue(0)
```
##### removeIfEmpty()
Removes the field key from the request if the value is considered empty.
* For arrays: removes if `[]`
* For objects: removes if `{}`
* For other fields: removes if `undefined`, `null`, or `''`
```js
param('status').removeIfEmpty()
param('items').isArray().removeIfEmpty()
param('meta').isObject().removeIfEmpty()
```
> **Note:** When both `defaultValue` and `removeIfEmpty` are used together, `defaultValue` is applied first. If the default value is non-empty, the field is kept.
```js
param('status').defaultValue('active').removeIfEmpty() // field is kept with value 'active'
```
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
  param('id').isRequired().isNumber()
]),
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
##### removeIfEmpty()
Applies `removeIfEmpty` behavior to all fields in the validation middleware. When enabled:
* Arrays: removed if `[]`
* Objects: removed if `{}`
* Other fields: removed if `undefined`, `null`, or `''`

This is a convenience method to avoid adding `removeIfEmpty()` to each field individually.
```js
// Instead of adding removeIfEmpty() to each field:
validateBody().addParams([
  param('name').removeIfEmpty(),
  param('email').removeIfEmpty(),
  param('phone').removeIfEmpty(),
])

// You can add it once at the top level:
validateBody().removeIfEmpty().addParams([
  param('name'),
  param('email'),
  param('phone'),
])
```
> **Note:** Field-level `removeIfEmpty()` can still be used when you only want to remove specific fields.
##### cleanUp()
Removes any keys from the request that are not declared in the validation params. This sanitizes the input to only include explicitly defined fields. Works recursively on nested objects and arrays.
```js
// Request body: { name: "John", email: "john@test.com", hackAttempt: "malicious", extra: "data" }
validateBody().cleanUp().addParams([
  param('name').isRequired(),
  param('email').isEmail(),
])
// After validation, req.body will only contain: { name: "John", email: "john@test.com" }
// The "hackAttempt" and "extra" keys are removed
```
This is useful for:
* Security: Preventing unexpected fields from being processed
* Data sanitization: Ensuring only declared fields reach your business logic
* API consistency: Keeping request payloads clean

> **Note:** `cleanUp()` also works recursively on nested objects and arrays defined with `addChild()` or `addChildren()`.
##### addParams(paramList)
* `paramList` *Mandatory* Array of field definition objects
```js
validateBody().addParams([
  // Add List of definition here
  param('field1').isRequired(),
])
```
Definintion of a field here : [Defining a Field](#defining-a-field)
## Dealing with nested objects
### Request body
```js
{
  "field1": "Value", // String, Mandatory
  "field2": [ // array, Mandatory
    { "field21": "44443" }, // object Optional, number mandatory
    { "field21": "44443" }
  ],
  "field3": { // Object Optional
    "field31": "true", // Boolean Mandatory
    "field32": "String" // String Mandatory
  },
  "field4": [ // array, Mandatory
    123, 445, 3434 // Number Optional
  ],
}
```
Should send http status code 500 in case of error
### Validation
```js
router.post('/users/:id',
validateBody().isToBeRejected().sendErrorCode(500).addParams([
  param('field1').isRequired(),
  param('field2').isRequired().isArray().isRequired().addChild(
    param('field2-array').isObject().addChild( // field2-array is for tracking, you can give any name here
      param('field21').isNumber().isRequired()
    )
  ),
  param('field3').isObject().addChildren([
    param('field31').isBoolean().isRequired(),
    param('field32').isRequired()
  ]),
  param('field4').isRequired().isArray().isRequired().addChild(
    param('field4-array').isNumber()
  ),
]),
validateParam().isToBeRejected().sendErrorCode(500).addParams([
  param('field1').isRequired(),
]),
// define validateQuery(), 
// define validateHeader(),
(req, res, next) => {

  // Main Service Here

});
```

## API Documentation Generator

Automatically generate beautiful HTML documentation for your API endpoints. The generator extracts all routes with validation middlewares and creates an interactive documentation page.

### Usage

```js
const express = require('express');
const { 
  validateBody, 
  validateQuery, 
  param, 
  generateDocs 
} = require('expressjs-field-validator');

const app = express();

// Define your routes with validation
app.post('/users',
  validateBody().isToBeRejected().addParams([
    param('name').isRequired(),
    param('email').isRequired().isEmail(),
  ]),
  (req, res) => res.status(201).send({ message: 'User created' })
);

app.get('/users/:id',
  validateQuery().isToBeRejected().addParams([
    param('include').shouldInclude(['profile', 'settings', 'posts']),
  ]),
  (req, res) => res.send({ user: {} })
);

// Generate documentation AFTER all routes are registered
generateDocs(app, {
  title: 'My API',
  version: '1.0.0',
  outputDir: './docs',
  filename: 'api-docs.html'
});

app.listen(3000);
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `outputDir` | `string` | `'./docs'` | Output directory for the generated HTML file |
| `filename` | `string` | `'api-docs.html'` | Output filename |
| `title` | `string` | `'API Documentation'` | Documentation title |
| `version` | `string` | - | API version to display |

### Features

- 🎨 **Beautiful dark theme** with syntax highlighting
- 🔍 **Search functionality** to filter endpoints
- 📊 **Statistics** showing endpoint counts by method
- 📋 **Detailed field information** including types, constraints, and nesting
- 📝 **Sample request body** with copy-to-clipboard functionality
- 🎯 **Response config display** (mode, error codes, cleanUp, etc.)
- 📱 **Responsive design** for mobile viewing

### Hosting API Documentation

You can serve the generated HTML documentation using Express static middleware:

```js
const express = require('express');
const path = require('path');
const { generateDocs, validateBody, param } = require('expressjs-field-validator');

const app = express();
app.use(express.json());

// Define your API routes
app.post('/users',
  validateBody().isToBeRejected().addParams([
    param('name').isRequired(),
    param('email').isRequired().isEmail(),
  ]),
  (req, res) => res.status(201).send({ message: 'User created' })
);

// Generate documentation
generateDocs(app, {
  title: 'My API',
  version: '1.0.0',
  outputDir: './docs'
});

// Serve the documentation at /api-docs
app.use('/api-docs', express.static(path.join(__dirname, 'docs')));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('API Docs available at http://localhost:3000/api-docs/api-docs.html');
});
```

**Alternative: Serve docs at root path**

```js
// Serve docs at /docs endpoint
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Or redirect /docs to the HTML file directly
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'api-docs.html'));
});
```

**Production Tips:**
- Add caching headers for better performance
- Use environment variables to conditionally enable docs (disable in production if needed)
- Consider adding authentication to protect internal API documentation

```js
// Only serve docs in non-production
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', express.static(path.join(__dirname, 'docs')));
}
```

## Migration Guide

### Migrating from v3.x to v4.x

#### Breaking Changes

##### 1. `end()` removed from field definitions

`end()` is no longer required (or available) when defining fields with `param()`.

```diff
- param('userName').isRequired().end()
+ param('userName').isRequired()
```

```diff
- param('field21').isNumber().isRequired().end()
+ param('field21').isNumber().isRequired()
```

##### 2. `done()` removed from validation middleware

`done()` is no longer required (or available) when creating validation middleware.

```diff
- validateBody().addParams([
-   param('field1').isRequired().end(),
- ]).done()
+ validateBody().addParams([
+   param('field1').isRequired(),
+ ])
```

```diff
- validateParam().isToBeRejected().sendErrorCode(500).addParams([
-   param('id').isNumber().end(),
- ]).done()
+ validateParam().isToBeRejected().sendErrorCode(500).addParams([
+   param('id').isNumber(),
+ ])
```

##### Full Before / After Example

**v3.x**
```js
router.post('/users/:id',
validateParam().addParams([
  param('id').isNumber().end()
]).done(),
validateBody().isToBeRejected().sendErrorCode(500).addParams([
  param('name').isRequired().end(),
  param('email').isEmail().end(),
  param('role').shouldInclude(['admin', 'user']).end(),
]).done(),
(req, res, next) => {
  // Main Service
});
```

**v4.x**
```js
router.post('/users/:id',
validateParam().addParams([
  param('id').isNumber()
]),
validateBody().isToBeRejected().sendErrorCode(500).addParams([
  param('name').isRequired(),
  param('email').isEmail(),
  param('role').shouldInclude(['admin', 'user']),
]),
(req, res, next) => {
  // Main Service
});
```

#### New Features

The following features are new in v4.x:

##### `defaultValue(value)`
Sets a default value for a field when the value is `undefined`, `null`, or `''`.
```js
param('status').defaultValue('active')
param('count').isNumber().defaultValue(0)
```

##### `removeIfEmpty()`
Removes the field key from the request if the value is empty.
```js
param('notes').removeIfEmpty()
param('tags').isArray().removeIfEmpty()
```

##### `convertToFormat(format)`
Converts a validated date to a different format. The original value in the request is replaced with the converted value.
```js
param('birthDate').isDate().dateFormat('DD/MM/YYYY').convertToFormat('YYYY-MM-DD')
```
