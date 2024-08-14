const express = require('express');
const createComment = require('../../controllers/v1/comment');
const verifyToken = require('../../middleware/Tokenhandler');

const router = express.Router();
router.post('/:id', verifyToken, createComment);

module.exports = router;