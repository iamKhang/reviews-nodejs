const { v4 } = require('uuid')
const { s3 } = require('../configs/aws.helper')
const Paper = require('../models/paper.model')
const validate = require('../utils/validate')

class PaperController {
    static async index(req, res) {
        const papers = await Paper.getAll()
        console.log(papers)
        res.render('index', { papers })
    }
    static async showForm(req, res) {
        const data = null;
        const errors = []
        res.render('create', { data, errors })
    }

    static async delete(req, res) {
        await Paper.delete(req.params)
        res.redirect('/')
    }
    static async create(req, res) {
        const file = req.file

        const errors = validate(req.body, file)
        console.log(errors)
        const errorObj = errors.reduce((obj, error) => {
            obj[error.field] = error.message
            return obj
        }, {})
        if (errors.length > 0) {
          return   res.render('create', { errors: errorObj, data: req.body })
        }

        const fileExtention = file.originalname.split('.').pop()
        const fileName = `${v4()}.${fileExtention}`
        const uploadParams = {
            Bucket: 'lehoangkhang',
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        const uploadResult = await s3.upload(uploadParams).promise()
        const imageUrl = uploadResult.Location
        const data = {
            isbn: req.body.isbn,
            name: req.body.name,
            author: req.body.author,
            publisher: req.body.publisher,
            publishYear: req.body.publishYear,
            imageUrl: imageUrl
        }
        await Paper.create(data)
        res.redirect('/')

    }
}

module.exports = PaperController