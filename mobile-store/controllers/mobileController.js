// File: controllers/mobileController.js
const Mobile = require('../models/mobile');
const { s3, bucketName } = require('../config/aws');
const { validateMobile } = require('../utils/validation');
const { v4: uuidv4 } = require('uuid');

class MobileController {
    // Hiển thị danh sách điện thoại
    static async index(req, res) {
        try {
            const mobiles = await Mobile.getAll();
            res.render('index', { mobiles });
        } catch (error) {
            res.status(500).send('Lỗi server');
        }
    }

    // Hiển thị form thêm mới
    static createForm(req, res) {
        res.render('create', { errors: [] });
    }

    // Xử lý thêm mới điện thoại
    static async create(req, res) {
        try {
            const errors = validateMobile(req.body, req.file);  // Truyền thêm req.file
            if (errors.length > 0) {
                return res.render('create', { errors, data: req.body });
            }

            // Upload ảnh lên S3
            const file = req.file;
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${uuidv4()}.${fileExtension}`;
            
            const uploadParams = {
                Bucket: bucketName,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype
            };

            const resultUpload=  await s3.upload(uploadParams).promise();
            const imageUrl = resultUpload.Location;


            // Tạo dữ liệu điện thoại
            const mobileData = {
                serialNumber: uuidv4(),
                name: req.body.name,
                price: parseFloat(req.body.price),
                brand: req.body.brand,
                releaseYear: parseInt(req.body.releaseYear),
                imageUrl: imageUrl
            };

            await Mobile.create(mobileData);
            res.redirect('/');
        } catch (error) {
            console.log(error)
            res.status(500).send('Lỗi server');
        }
    }

    // Xử lý xóa điện thoại
    static async delete(req, res) {
        try {
            const { serialNumber } = req.params;
            await Mobile.delete(serialNumber);
            res.redirect('/');
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    }
}

module.exports = MobileController;