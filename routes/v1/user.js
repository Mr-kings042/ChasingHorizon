const express = require('express');
const {createUser, getUser, updateUser} = require('../../controllers/v1/user');
const verifyToken = require('../../middleware/Tokenhandler');

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken , getUser);
router.patch("/", verifyToken , updateUser);

module.exports = router;