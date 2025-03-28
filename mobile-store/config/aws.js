// File: config/aws.js
const AWS = require('aws-sdk');
require('dotenv').config();

// Cấu hình AWS
const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
};

// Khởi tạo S3
const s3 = new AWS.S3(awsConfig);

// Khởi tạo DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient(awsConfig);

module.exports = {
    s3,
    dynamodb,
    bucketName: process.env.AWS_BUCKET_NAME
}; 