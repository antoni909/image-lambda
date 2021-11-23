const AWS = require('aws-sdk')
const s3 = new AWS.S3()

exports.handler = async (event) => {
// get event 

    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;
    const size = event.Records[0].s3.object.size;
    const eTag = event.Records[0].s3.object.eTag;
    
    const params = {
        Bucket: bucket,
        Key: 'images.json',
    };

// get S3 obj - images.json already in bucket lolz
    try{
    
    const { ContentType, Body } = await s3.getObject(params).promise();
// create function to handle this process
        let bodyToString = await Body.toString('utf-8'); //
        let objBody = JSON.parse(bodyToString)
        let dictionary = objBody.dictionary
        let metaData = { Bucket: bucket, Key: key, ETag: eTag, Size: size }
        dictionary.push(metaData)
        let bodyToJSON = JSON.stringify(objBody)
        
    } catch(err) { 
        console.log('err: ',err);
        const message = `Error getting object ${key} from bucket ${bucket}`;
        throw new Error(message);
    }
// put/overwrite images.json object in S3 bucket with newly added object in the dictionary arr


   return 'New Image Object Added'
};
