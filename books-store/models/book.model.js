const {dynamodb} = require('../configs/aws.helped')

class Book{
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

    static async delete(isbn) {
        const params = {
            TableName: 'books',
            Key: isbn
        }
        const result = await dynamodb.delete(params).promise()
        return result.Items
    }
}

module.exports = Book