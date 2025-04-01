const aws = require('aws-sdk')
require('dotenv').config()

aws.config.update({
    accessKeyId: process.env.access,
    secretAccessKey: process.env.secret,
    region: process.env.region
})

const s3  = new aws.S3()
const dynamodb = new aws.DynamoDB.DocumentClient()

module.exports = {s3, dynamodb}