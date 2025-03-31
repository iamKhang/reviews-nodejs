const multer = require('multer')
const Store = require('../models/store.model')
const {s3} = require('../configs/aws.heper')
const validate = require('../utils/validate')
const { v4 } = require('uuid')

class StoreController{
    static async index(req, res){
        const stores = await Store.getAll()
        res.render('index', {stores})
    }
    static async showForm(req, res){
        const errors = []
        const data = null
        res.render('create', {errors, data})
    }
    static async delete(req, res){
        await Store.delete(req.params)
        res.redirect('/')
    }

    static async create(req, res){
        const file = req.file
        console.log(file)
        const body = req.body
        const errors = validate(body, file)
        const errorObj = errors.reduce((obj, error) => {
            obj[error.field] = error.message;
            return obj;
        }, {});
        console.log(errors);
        if(errors.length>0){
            return res.render('create', {errors: errorObj , body})
        }
        const fileExtention = file.originalname.split('.').pop()
        const fileName = `${v4()}.${fileExtention}`
        const uploadParams = {
            Bucket: 'lehoangkhangontap',
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        const uploadResult = await s3.upload(uploadParams).promise()
        const imageUrl = uploadResult.Location
        const data = {
            id: v4(),
            name: body.name,
            address: body.address,
            manager: body.manager,
            imageUrl: imageUrl,
            email: body.email
        }
        await Store.create(data)
        res.redirect('/')
    }
}

module.exports = StoreController