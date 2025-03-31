const {dynamodb} = require('../configs/aws.heper')

class Store{
    static async getAll(){
        const params = {
            TableName: 'stores'
        }
        const result = await dynamodb.scan(params).promise()
        return result.Items
    }
    static async delete(id){
        const params = {
            TableName: 'stores',
            Key: id
        }
        const result = await dynamodb.delete(params).promise()
        return result.Items
    }
    static async create(data){
        try {
            const params = {
                TableName: 'stores',
                Item: data
            }
            const result = await dynamodb.put(params).promise()
            return result.Items
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = Store