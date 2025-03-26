const { s3, dynamodb } = require('../configs/aws')


class Book {
    static async getAll() {
        try {
            const params = {
                TableName: 'papers',
            }
            const result = await dynamodb.scan(params).promise();
            console.log(result)
            return result.Items;
        } catch (error) {
            console.error('Error fetching data from DynamoDB:', error);
            throw error;
        }
    }
    static async create(paperData, file) {
        try {
            let coverImageUrl = ''
            if (file) {
                const params = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: `papers/${Date.now()}${file.originalname}`,
                    Body: file.buffer,
                    ContentType: file.mimetype
                }
                const uploadResult = await s3.upload(params).promise();
                coverImageUrl = uploadResult.Location

            }

            console.log("Hellllllllllllllllllll:",paperData)
            const paper = {
                TableName: 'papers',
                Item: { ...paperData, coverImageUrl: coverImageUrl }
            }
            const result = await dynamodb.put(paper).promise();
            return paper;
        } catch (error) {
            console.error('Error fetching data from DynamoDB:', error);
            throw error;
        }
    }
}
module.exports = Book