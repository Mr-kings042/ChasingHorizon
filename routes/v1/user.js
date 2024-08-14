const express = require('express');
const {createUser, getUser, updateUser, archiveUser} = require('../../controllers/v1/user');
const verifyToken = require('../../middleware/Tokenhandler');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post("/", upload.single('photo'), createUser);
router.get("/", verifyToken , getUser);
router.patch("/", verifyToken , updateUser);
router.delete("/", verifyToken , archiveUser);

module.exports = router;