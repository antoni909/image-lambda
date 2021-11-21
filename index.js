var AWS = require('aws-sdk');

//constants
var MAX_WIDTH = 100;
var MAX_HEIGHT = 100;

// references to S3 client
var s3 = new AWS.S3();

// The AWS Lambda
exports.handler = function(event, context, callback){
  // read opts from event obj
  console.log('*** event obj opts: \n', JSON.stringify(event,undefined,2))

  let obj = {
    statusCode: 200,
    body: 'foobar'
  };

  return obj
};
