const express = require('express')
const PostController = require('../controllers/post.controller')
const multer = require('multer')
const router = express.Router()

const update = multer({
    storage: multer.memoryStorage()
})

router.get('/', PostController.index)
router.get('/create', PostController.showForm)
router.post('/create', update.single('image'),PostController.create)
router.post('/delete/:isbn', PostController.delete)



module.exports = router