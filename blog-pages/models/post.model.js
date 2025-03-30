const { dynamodb } = require("../configs/aws.help")

class Post {
    static async getAll() {
        const params = {
            TableName: 'books'
        }
        const result = await dynamodb.scan(params).promise()
        return result.Items
    }
    static async create(data) {
        const params = {
            TableName: 'books',
            Item: data
        }
        const result = await dynamodb.put(params).promise()
        return result
    }
    static async remove(id) {
        const params = {
            TableName: 'books',
            Key: id
        }
        const result = await dynamodb.delete(params).promise()
        return result
    }
}

module.exports = Post