const  {dynamodb} = require('../configs/aws.help')

class Product{
    static async getAll(){
        const params ={
            TableName: 'products'
        }
        const result = await dynamodb.scan(params).promise()
        return result.Items
    }
    static async create(data){
        const params ={
            TableName: 'products',
            Item: data
        }
        const result = await dynamodb.put(params).promise()
        return result;
    }
}

module.exports=Product