const { dynamodb } = require("../configs/aws.help")

class Student{
    static async getAll(){
        try {
            const params = {
                TableName: 'students'
            }
            const result = await dynamodb.scan(params).promise()
            return result.Items
        } catch (error) {
            
        }
    }
    static async add(data){
        try {
            const params = {
                TableName: 'students',
                Item: data
            }
            await dynamodb.put(params).promise()
            return data
        } catch (error) {
            
        }
    }
    static async remove(id){
        try {
            const params = {
                TableName: 'students',
                Key: id
            }
            await dynamodb.delete(params).promise()
        } catch (error) {
            
        }
    }
}

module.exports = Student