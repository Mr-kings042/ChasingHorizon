const express = require('express');
const {createTag, getTags, updateTag, deleteTag} = require('../../controllers/v1/tag');
const verifyToken = require('../../middleware/Tokenhandler');

const router = express.Router();

router.post('/', verifyToken, createTag);
router.get('/',verifyToken, getTags);
router.patch('/:id',verifyToken,updateTag);
router.delete('/:id', verifyToken, deleteTag);

module.exports = router;