const express = require('express')
const StudentController = require('../controllers/student.controller')
const multer = require('multer')
const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

router.get('/', StudentController.index)
router.get('/create', StudentController.showForm)
router.post('/delete/:id', StudentController.delete)
router.post('/create', upload.single('image'),StudentController.create)



module.exports=router