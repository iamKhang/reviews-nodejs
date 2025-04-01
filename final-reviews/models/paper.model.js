const {dynamodb} = require('../configs/aws.helper')

class Paper{
    static async getAll(){
        try {
            const params = {
                TableName: 'papers'
            }
            const result = await dynamodb.scan(params).promise()
            return result.Items
        } catch (error) {
            console.log(error)
        }
    }
    static async create(data){
        try {
            const params = {
                TableName: 'papers',
                Item: data
            }
            const result = await dynamodb.put(params).promise()
            return result.Items
        } catch (error) {
            console.log(error)
        }
    }
    static async delete(id){
        try {
            const params = {
                TableName: 'papers',
                Key: id
            }
            const result = await dynamodb.delete(params).promise()
            return result.Items
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Paper