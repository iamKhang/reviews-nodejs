const express = require('express')
const router = express.Router()
const multer = require('multer')
const StorageController = require('../controllers/store.controller')

const upload = multer({
    storage: multer.memoryStorage()
})

router.get('/', StorageController.index)
router.get('/create', StorageController.showForm)
router.post('/create', upload.single('image'),StorageController.create)
router.post('/delete/:id', StorageController.delete)

module.exports = router