const { v4 } = require("uuid")
const Subject = require("../models/subject.model")
const { s3 } = require("../configs/aws.help")

class SubjectController{

    static async index(req, res){
        const subjects = await Subject.getAll()
        res.render('index', {subjects})
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
            Bucket: 'reviewsfinal',
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        const uploadResult = await s3.upload(uploadParams).promise()
        const imageUrl = uploadResult.Location
        const data = {
            id: req.body.id,
            name: req.body.name,
            lecture: req.body.lecture,
            credit: parseInt(req.body.credit),
            startAt: new Date(req.body.startAt).toDateString(),
            imageUrl: imageUrl
        }
        await Subject.create(data)
        res.redirect('/')
    }

    static async delete(req, res){
        await Subject.delete(req.params)
        res.redirect('/')
    }

}
module.exports = SubjectController