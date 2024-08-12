const express = require('express');
const multer = require('multer');
const {uploadPhoto, getPhoto, getPhotos} = require('../../controllers/v1/photo');
const verifyToken = require('../../middleware/Tokenhandler');


const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.post('/', upload.single('photo'), verifyToken, uploadPhoto);
router.get('/', verifyToken, getPhoto);
router.get('/:id',verifyToken, getPhotos);

module.exports = router;