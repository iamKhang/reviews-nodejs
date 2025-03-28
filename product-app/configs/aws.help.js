const AWS = require('aws-sdk')
require('dotenv').config()

const config = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
}

const s3 = new AWS.S3(config)
const dynamodb = new AWS.DynamoDB.DocumentClient(config)

module.exports = {
    s3, dynamodb, Bucket: process.env.BUCKET
}