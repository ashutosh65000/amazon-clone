const aws=require("aws-sdk");
const multer=require("multer");
const multerS3=require("multer-s3");
const { S3 } = require("aws-sdk");

aws.config.update({
    secretAccessKey:process.env.AWSSecretKey,
    accessKeyId:process.env.AWSAccessKeyId
});

const s3=new aws.S3();

const upload=multer({
    storage:multerS3({
        s3:s3,
        //Name of the S3 bucket here
        bucket:process.env.AWSS3BucketName,
        //AccessControlList:Owner gets FULL_CONTROL. The AllUsers group gets READ access.
        acl:"public-read",
        metadata: (req,file,cb)=>{      
            // cb(null, Object.assign({}, req.body)); -> stores all fields in the request body as metadata              
            cb(null,{fieldName:file.originalname});
        },
        key: (req,file,cb)=>{
            
            cb(null,Date.now().toString());
        }
    })
});

module.exports=upload;