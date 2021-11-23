# AWS: S3 & Lambdas

## Overview

AWS Lambda allows writing code that is triggered in the cloud, without thinking about maintaining servers. We’ll use it today to automatically run some processing on image files after they’re uploaded to an S3 Bucket

## Feature Tasks

Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser
  'make the resource (S3 obj) public to any service on AWS'
A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far

  ' let user upload img, any size '
  ' let user update a dictionary (arr of all imgs) = img.json'
  ' when img uploaded: '
  ' 1. download img.json '
  ' 2. return meta data obj that describes the img '
  ' 3. append new img to dictionary'
  ' 4. upload image.json to S3'

When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:

- Download a file called “images.json” from the S3 Bucket if it exists
    'means to modify the file using the s3 lib to look at file from lambda'
- The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present
    'start as empty arr and fill with objs as being created'
Create a metadata object describing the image: Name, Size, Type, etc.
    'the img object added to arr should have the: Name, size, type, etc whatever you want to associate with it'

Append the data for this image to the array
    'put that arr inside images.json '

- Note: If the image is a duplicate name, update the object in the array, don’t just add it
    'change the name of obj if duplicate..can add a num to end of name'
- Upload the images.json file back to the S3 bucket

    'so:
    1. read from the file
    1. add to the contents of the file
    1. use PUT to create if not there and update if its there
    '

## Documentation

README.md includes:

-a description of how to use your lambda.
-a description of any issues you encountered during deployment of this lambda.
-a link to your images.json file

## Stretch Goal

    Automatically deploy your function on check-ins to your main branch using a github action

## Submission Instructions

Create a new repository for your lambda function, called ‘image-lambda’
Work on a non-main branch and make commits appropriately.
Update your README.md file with the required documentation above.
Create a pull request to your master branch with your work for this lab.
Submit the link to that pull request on Canvas.

## Starter Code

'use strict';

// dependicies
let async = require('async');
let AWS = require('aws-sdk');
let util = require('util');

let s3 = new AWS.S3();

// setup our lambda handler
exports.handler = function (event, context, callback) {
  console.log(event); // START HERE!! util.inspect(event, { depth })
  // run all functions that are dependent on the return from the function above
  async.waterfall();


  // let a user upload an image of any size
  let params = { "Bucket": 'eggBuket', "Key": 'uuid', "Body": "", "contentType": };
  s3.upload(params, function (err, data) {

  });

  // get images.json
  s3.getObject(); // get images.json
  // let a user update:Create, Delete, rename? a dictionary, an array of images, of all images
  // when uploaded -> dwnlod images.json(dictionary of images) -> array of objs(images), create array if none
  // return meta data obj = image: name, Size, type, etc
  // append ne wimage to dictionary
  // upload image.json to S3
}
