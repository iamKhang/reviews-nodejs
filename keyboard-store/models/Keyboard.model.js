const {dynamodb} = require('../config/aws')

class KeyBoard {
    static async getAll(){
        try {
            const params = {
                TableName: 'keyboards'
            }
            const result = await dynamodb.scan(params).promise()
            console.log(result)
            return result.Items
        } catch (error) {
            console.log('Loi lay du lieu')
        }
    }
    static async remove(id){
        try {
            const params = {
                TableName: 'keyboards',
                Key: id
            }
            const result = await dynamodb.delete(params).promise()
        } catch (error) {
            console.log('Loi xoa du lieu')
        }
    }
    static async add(data){
        try {
            const params = {
                TableName: 'keyboards',
                Item: data
            }
            const result = await dynamodb.put(params).promise()
        } catch (error) {
            console.log('Loi them du lieu')
        }
    }
}

module.exports = KeyBoard