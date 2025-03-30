const express = require('express')
const BookControler = require('../controllers/book.controller')
const router = express.Router()
const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage()
})

router.get('/', BookControler.index)
router.get('/create', BookControler.showForm)
router.post('/create', upload.single('image'),BookControler.create)
router.post('/delete/:isbn', BookControler.delete)


module.exports = router