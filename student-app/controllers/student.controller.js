const { v4 } = require("uuid")
const Student = require("../models/student.model")
const { s3 } = require("../configs/aws.help")

class StudentController {
    static async index(req, res) {
        try {
            const students = await Student.getAll()
            res.render('index', { students })
        } catch (error) {
            console.log(error)
        }
    }

    static async showForm(req, res) {
        try {
            res.render('create')
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(req, res) {
        try {
            await Student.remove(req.params)
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

    static async create(req, res) {
        try {
            const file = req.file;
            console.log(file)
            const fileExtention = file.originalname.split('.').pop()
            const fileName = `${v4()}.${fileExtention}`
            const uploadParams = {
                Bucket: process.env.BUCKET,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype
            }
            const uploadResult = await s3.upload(uploadParams).promise()
            const imageUrl = uploadResult.Location
            const data = {
                id: req.body.id,
                name: req.body.name,
                dob: req.body.dob,
                phoneNumber: req.body.name,
                imageUrl: imageUrl
            }
            await Student.add(data)
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = StudentController