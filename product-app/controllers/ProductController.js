
const { s3 } = require('../configs/aws.help')
const Product = require('../models/Product')

class ProductController{
    static async index(req, res){
        const products = await Product.getAll()
        console.log(products)
        res.render('index', {products})
    }

    static async showForm(req, res){
        res.render('create')
    }

    static async create(req, res){
        const file = req.file
        // const fileExtention = file.originalName.split('.').pop();
        // const fileName = `${new Date().toDateString()}.${fileExtention}`
        console.log(file)
        // const uploadParams = {
        //     Bucket: bucketName,
        //     Key: fileName,
        //     Body: file.buffer,
        //     ContentType: file.mimetype
        // }
        // const resultUpload = await s3.upload(uploadParams).promise()
        // const imageUrl = resultUpload.Location
        const productData ={
                quantity: req.body.quantity,
                // imageUrl: imageUrl,
                id: req.body.id,
                price: req.body.price,
                name: req.body.name
        }
        console.log(productData)
        await Product.create(productData)
        res.redirect('/')
    }
}

module.exports=ProductController