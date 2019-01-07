# expressjs-field-validator
Plugin for validating field values of json request in expressjs
[![Dependency Status](https://david-dm.org/gsmithun4/expressjs-field-validator.svg)](https://david-dm.org/gsmithun4/expressjs-field-validator)
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [validator arguments](#validator-arguments)
  - [validator Object](#validator-object)
    - [Nested Objets](#nested-objets)
  - [Response object](#response-object)
    - [Mode](#mode)
      - [Reject](#reject)
      - [Forward](#forward)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation  
```
$ npm install expressjs-field-validator
```

## Dependencies
 - [lodash](https://www.npmjs.com/package/lodash)
 - [moment](https://www.npmjs.com/package/moment)

## Usage

```js
 const validator = require('expressjs-field-validator');
```
```js
router.get('/users/:id',
validator([{param : 'id', location : 'params', isRequired : true}], { mode : 'reject', errorCode : '422' }),
(req, res, next) => {

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
|location	  |`String`   | Location of the field (`body`/`params`/`query`) |
|children	  |`Object[]`   |Array of Child validator objects, only applicable if the field is `Array` or `Object`  |
|isArray	  |`Boolean`   |The value is `Array` or not (default `false`)|
|isObject	  |`Boolean`   |The value is `Object` or not (default `false`)|
|isRequired	  |`Boolean`   |The value is mandatory or not (default `false`)|
|isNumber	  |`Boolean`   |The value is `Number` or not (default `false`)|
|isEmail	  |`Boolean`   |The value is `Email` or not (default `false`)|
|isBoolean	  |`Boolean`   |The value is `Boolean` or not (default `false`)|
|isDate	  |`Boolean`   |The value is `Date` or not (default `false`)|
|format	  |`String`   |Date format|
|length	  |`Object`   |Object `{min : 1, max : 10}` describes minimum and maximum length|
|message	  |`String`   |Error message thrown in case of test fails|

#### Nested Objets
Only applicable in case of `Object` and `Array` `isArray` or `isObject` must be true
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
```
the validator object
```js
{param : 'page', location : 'body', isObject : true, children : [
    {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
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
```
### Response object
| Property        | Type      | Description
|:---------------|:---------|----------------------------|
|mode	  |`String`   | can be `reject` or `forward`, Mandatory field|
|errorCode	  |`String`   | Error code thrown |

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
Error is set to `locals.data` and error code to `locals.statusCode`. Forward the request to next middleware.
