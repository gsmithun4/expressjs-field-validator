const express = require('express');
const bodyParser = require('body-parser');
const validator = require('./validator');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/test',
validator([
  {param : 'id', location : 'body', isRequired : true, mobileNumber : {isCountryCodeMandatory: true, countryCode: '91', length: {min: 10, max: 12}}}
  // {param : 'page', location : 'body', isObject : true, children : [
  //   {param : 'sorted', location : 'body.page', isRequired : true, isBoolean : true},
  // ]},
  // {param : 'sort', location : 'body', isArray : true, children : [
  //   {param : 'a', location : 'body.sort', isArray : true, children : [
  //     {param : 'sort', location : 'body.sort.a', isRequired : true, isDate : true},
  //     {param : 'pageNumber', location : 'body.sort.a', isObject : true, children : [
  //       {param : 'b', location : 'body.sort.a.pageNumber', isNumber : true},
  //       {param : 'c', location : 'body.sort.a.pageNumber', isNumber : true}
  //     ]},
  //     {param : 'pageNumber1', location : 'body.sort.a', isObject : true, children : [
  //       {param : 'd', location : 'body.sort.a.pageNumber1', isNumber : true},
  //       {param : 'e', location : 'body.sort.a.pageNumber1', isNumber : true}
  //     ]}
  //   ]}
  // ]}
],
{ mode : 'reject', errorCode : '422', debug: true }),
(req, res, next) => {
  if (res.locals.statusCode === 422)
    console.log("Invalid Field Status Code");

  console.log("Exit");
  res.status(200).send();

});

//Starting app
app.listen(5000, err => {
  if (err) {
    console.error(`Error While Starting app Error :: ${err}`);
  }
  console.log(`server is listening on 5000`);
});
