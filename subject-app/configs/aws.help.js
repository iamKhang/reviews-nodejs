const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    accessKeyId: process.env.access,
    secretAccessKey: process.env.secret,
    region: process.env.region
})

const s3 = new AWS.S3()
const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports = {s3, dynamodb}