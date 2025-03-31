const express = require('express')
const SubjectController = require('../controllers/subject.controller')
const router = express.Router()
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

router.get('/', SubjectController.index)
router.get('/create', SubjectController.showForm)
router.post('/create', upload.single('image'), SubjectController.create)
router.post('/delete/:id', SubjectController.delete)

module.exports = router