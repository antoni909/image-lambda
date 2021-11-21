# image-lambda

## resources

[working with objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/uploading-downloading-objects.html)

automatically run some processing on image files after they’re uploaded to an S3 Bucket

## Lambda Function

- triggered by other aws services

## S3

Create bucket

1. In the AWS Console, find [S3](https://s3.console.aws.amazon.com/s3/home?region=us-west-2)

1. create new Bucket (name it cf-img-Bucket)

1. Go to Properties Tab

1. Scroll down to find Create Event

1. Create event notification
  
  - (With S3 Event Notifications, you can receive notifications when certain events happen in your bucket).
  - Want to create an event for when new upload happens.
  - Amazon S3 can publish notifications for object create, object delete, object restore, and Reduced Redundancy Storage Class (RRS) object loss events.

  1. General Configuration for
    Select:
    - event name
    - event types
    - destination

1. User Event: Upload image

  using:
    - GUI - go to S3 bucket, upload an image to s3

## AWS Management Console: [CloudWatch](https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#)

1. go to lambdas service

1. click monitor tab

1. click CloudWatch

  - this lets you see log details and log streams as events happen
  - the event object value is --> { Records: [ {...data} ] }

1. When upload an image, lambda should add a .json object file on S3

## How to make modifications on an S3 bucket from Lambda Function using Amazon AWS-S3 SDK

### To add to Code Source in the AWS Managemant Console

    - would have to install the dependency locally
    - zip the file
    - upload to code source

### To let Lambda Function perform operations on S3 bucket, will have to add permissions

- enter a policy that grants access to your S3 bucket : AmazonS3FullAccess

- modifying roles:
  attached an S3 policy to lambda function
