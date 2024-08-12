const express = require('express');
const multer = require('multer');
const {uploadPhoto} = require('../../controllers/v1/photo');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.post('/', upload.single('photo'), uploadPhoto);

module.exports = router;