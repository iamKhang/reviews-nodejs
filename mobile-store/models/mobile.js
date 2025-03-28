// File: models/mobile.js
const { dynamodb } = require('../config/aws');

class Mobile {
    static async getAll() {
        const params = {
            TableName: 'mobiles'
        };
        const result = await dynamodb.scan(params).promise();
        return result.Items;
    }

    static async create(mobileData) {
        const params = {
            TableName: 'mobiles',
            Item: mobileData
        };
        await dynamodb.put(params).promise();
        return mobileData;
    }

    static async delete(serialNumber) {
        const params = {
            TableName: 'mobiles',
            Key: {
                serialNumber: serialNumber
            }
        };
        await dynamodb.delete(params).promise();
        return true;
    }
}

module.exports = Mobile; 