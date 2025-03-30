const aws = require('aws-sdk')
require('dotenv').config()

aws.config.update({
    accessKeyId: process.env.ACCESS,
    secretAccessKey: process.env.SECRET,
    region: process.env.REGION
})

const s3 = new aws.S3()
const dynamodb = new aws.DynamoDB.DocumentClient()

module.exports = {s3, dynamodb}