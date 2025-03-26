const express = require('express')
const router = express.Router()
const multer = require('multer')
const PaperController = require('../controllers/PaperController')

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

router.get('/', PaperController.index)
router.get('/add', PaperController.showAddForm)
router.post('/add', upload.single('file'), PaperController.create)

module.exports = router