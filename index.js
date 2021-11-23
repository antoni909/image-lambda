const AWS = require('aws-sdk')
const s3 = new AWS.S3()

// check if file is image file
const isFile = (file) =>{
  const type = ['gif', 'jpg', 'jpeg', 'png']
  const parsed = file.split('.')[1]
  const isImage = type.includes(parsed)
  return isImage
}

exports.handler = async (event) => {

// get event 
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;
    const size = event.Records[0].s3.object.size;
    const eTag = event.Records[0].s3.object.eTag;
    let isImage = isFile(key)
    let bodyToJSON;

// get S3 obj - images.json already in bucket lolz
    try{

        const paramsGet = {
            Bucket: bucket,
            Key: 'images.json',
        };

        if(!isImage) {return `${key} is not an image file in bucket ${bucket}`}

        else{

            const { ContentType, Body } = await s3.getObject(paramsGet).promise()
            let bodyToString = await Body.toString('utf-8'); //
            let objBody = JSON.parse(bodyToString)
            let dictionary = objBody.dictionary
            let metaData = { Bucket: bucket, Key: key, ETag: eTag, Size: size }
            dictionary.push(metaData)
            bodyToJSON = JSON.stringify(objBody)
            console.log('*** bodyToJSON ',bodyToJSON)

        }

    } catch(err) { 
        console.log('err: ',err);
        const message = `Error getting object ${key} from bucket ${bucket}`;
        throw new Error(message);
    }

// put/overwrite images.json object in S3 bucket with newly added object in the dictionary arr
    
    if( isImage && bodyToJSON ){

        const paramsPut = {
            Body: bodyToJSON,
            Bucket: bucket,
            Key: 'images.json'
        }

        try{
            const data = await  s3.putObject(paramsPut).promise()
            console.log('*** success data: ', data)

        } catch(err) {
            const message = `err: ${err}, err.stack: ${err.stack}`;
            throw new Error(message);
        }

    } else return `failed to upload ${key} into bucket ${bucket} :( `


   return `Success: image object ${key} added to image.json object in bucket ${bucket}`
};
