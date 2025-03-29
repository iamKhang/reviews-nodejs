const { dynamodb } = require("../configs/aws.help")

class Paper{
    static async getAll(){
        const params = {
            TableName: "papers"
        }
        const result = await dynamodb.scan(params).promise()
        return result.Items
    }
    static async create(data){
        const params = {
            TableName: 'papers',
            Item: data
        }
        const result = await dynamodb.put(params).promise()
        return data
    }
    static async delete(id){
        const params = {
            TableName: "papers",
            Key: id
        }
        const result = await dynamodb.delete(params).promise()
        return id
    }
}

module.exports= Paper