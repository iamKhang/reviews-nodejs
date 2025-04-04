const express = require('express')
const PaperController = require('../controllers/paper.controller')
const router = express.Router()
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

router.get('/', PaperController.index)
router.get('/create', PaperController.showForm)
router.post('/create', upload.single('image'),PaperController.create)
router.post('/delete/:isbn', PaperController.delete)



module.exports = router