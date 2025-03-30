const { v4 } = require('uuid')
const Book = require('../models/book.model')
const {s3} = require('../configs/aws.helped')


class BookControler{
    static async index(req, res){
        const books = await Book.getAll()
        console.log(books)
        res.render('index', {books})
    }
    static async showForm(req, res){
        res.render('create')
    }
    static async delete(req, res){
        await Book.delete(req.params)
        res.redirect('/')
    }
    static async create(req, res){
        const file = req.file
        const fileExtention = file.originalname.split('.').pop()
        const fileName = `${v4()}.${fileExtention}`
        const uploadParams = {
            Bucket: 'lehoangkhang',
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        console.log(uploadParams);
        const uploadResult = await s3.upload(uploadParams).promise()
        const imageUrl = uploadResult.Location
        const data = {
            isbn: req.body.isbn,
            name: req.body.name,
            pages: parseInt(req.body.pages),
            publisher: req.body.publisher,
            publishYear: parseInt(req.body.publishYear),
            imageUrl: imageUrl
        }
        await Book.create(data)
        res.redirect('/')
    }
}


module.exports = BookControler