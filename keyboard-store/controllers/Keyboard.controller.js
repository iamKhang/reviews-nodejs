const KeyBoard = require('../models/Keyboard.model')
const { s3 } = require('../config/aws')
const { v4: uuid } = require('uuid')

class KeyBoardController {
    static async index(req, res) {
        try {
            const keyboards = await KeyBoard.getAll()
            console.log(keyboards)
            res.render('index', { keyboards })
        } catch (error) {
            console.log('Loi render trang chu')
        }
    }

    static async createShow(req, res) {
        try {
            res.render('create')
        } catch (error) {
            console.log('Loi render trang chu')
        }
    }

    static async create(req, res) {
        try {
            const file = req.file
            console.log(file)
            console.log(req.body)
            const fileExtention = file.originalname.split('.').pop()
            const filename = `${uuid()}.${fileExtention}`
            const uploadParams = {
                Bucket: 'reviewsnodejs',
                Key: filename,
                Body: file.buffer,
                ContentType: file.mimetype
            }
            console.log(uploadParams)
            const resultUpload = await s3.upload(uploadParams).promise()
            const imageUrl = resultUpload.Location
            const data = {
                id: req.body.id,
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
                brand: req.body.brand,
                year: req.body.year,
                imageUrl: imageUrl
            }
            await KeyBoard.add(data)
            res.redirect('/')
        } catch (error) {
            console.log('Loi render trang chu')
        }
    }

    static async remove(req, res) {
        try {
            await KeyBoard.remove(req.params)
            res.redirect('/')
        } catch (error) {
            console.log('Loi xoa')
        }
    }
}

module.exports = KeyBoardController