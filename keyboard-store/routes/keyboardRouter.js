const express = require('express')
const router = express.Router()
const KeyBoardController = require('../controllers/Keyboard.controller')
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

router.get('/', KeyBoardController.index)
router.post('/delete/:id', KeyBoardController.remove)
router.get('/create', (req,res)=>{
    res.render('create')
})
router.post('/create', upload.single('image'),KeyBoardController.create)

module.exports=router