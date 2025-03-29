const { v4 } = require("uuid");
const Paper = require("../models/paper.model");
const { s3 } = require("../configs/aws.help");


class PaperController {
    static async index(req, res){
        const papers = await Paper.getAll()
        console.log(papers);
        res.render('index', {papers})
    }

    static async delete(req, res){
        const papers = await Paper.delete(req.params)
        res.redirect('/')
    }

    static async showForm(req, res){
        res.render('create')
    }
    static async create(req, res){
        const file = req.file
        console.log(file);
        const fileExtention = file.originalname.split('.').pop()
        const fileName = `${v4()}.${fileExtention}`
        const uploadParams ={
            Bucket: process.env.BUCKET,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        const uploadResult = await s3.upload(uploadParams).promise()
        const imageUrl = uploadResult.Location
        const data ={
            isbn: req.body.isbn,
            name: req.body.name,
            publisher: req.body.publisher,
            publishYear: req.body.publishYear,
            pages: req.body.pages,
            imageUrl: imageUrl
        }
        await Paper.create(data)
        res.redirect('/')
    }
}

module.exports=PaperController