const { dynamodb } = require("../configs/aws.help")


class Subject {
    static async getAll(){
        const param = {
            TableName: 'subjects'
        }
        const result = await dynamodb.scan(param).promise()
        return result.Items
    }
    static async create(data){
        const param = {
            TableName: 'subjects',
            Item: data
        }
        const result = await dynamodb.put(param).promise()
        return result.Items
    }
    static async delete(id){
        const param = {
            TableName: 'subjects',
            Key: id
        }
        const result = await dynamodb.delete(param).promise()
        return result.Items
    }
}

module.exports = Subject