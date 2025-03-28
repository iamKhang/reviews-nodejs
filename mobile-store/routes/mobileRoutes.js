// File: routes/mobileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const MobileController = require('../controllers/mobileController');

// Cấu hình multer để xử lý upload file
const upload = multer({
    storage: multer.memoryStorage(),
});

// Routes
router.get('/', MobileController.index);
router.get('/create', MobileController.createForm);
router.post('/create', upload.single('image'), MobileController.create);
router.post('/:serialNumber', MobileController.delete);

module.exports = router;