const express = require('express')
const route = express.Router()
const multer = require('multer')

const ProductController = require('../controllers/ProductController')
route.get('/', ProductController.index)
route.get('/create', ProductController.showForm)
route.post('/create', ProductController.create)

module.exports=route