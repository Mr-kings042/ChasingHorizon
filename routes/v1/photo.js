const express = require('express');
const multer = require('multer');
const {uploadPhoto, getPhoto, getPhotos} = require('../../controllers/v1/photo');
const verifyToken = require('../../middleware/Tokenhandler');


const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.post('/', verifyToken, uploadPhoto);
router.get('/:id', verifyToken, getPhoto);
router.get('/',verifyToken, getPhotos);

module.exports = router;