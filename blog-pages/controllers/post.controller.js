const { v4 } = require('uuid')
const {s3} = require('../configs/aws.help')
const multer = require('multer')
const Post = require('../models/post.model')



class PostController{
    static async index(req, res){
        const posts = await Post.getAll()
        res.render('index', {posts})
    }

    static async delete(req, res){
        await Post.remove(req.params)
        res.redirect('/')
    }

    static async showForm(req, res){
        res.render('create')
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
        const uploadResult = await s3.upload(uploadParams).promise()
        const iamgeUrl = uploadResult.Location
        const data ={ 
            isbn: req.body.isbn,
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            date: req.body.date,
            tags: req.body.tags,
            iamgeUrl: iamgeUrl
        }
        await Post.create(data)
        res.redirect('/')
    }
}
module.exports = PostController