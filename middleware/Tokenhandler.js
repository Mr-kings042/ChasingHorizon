const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const asynchandler = require('express-async-handler');

const JWTSECRET = process.env.JWT_SECRET;

const verifyToken = asynchandler (async (req,res, next ) =>{
    let token = req.headers.authorization;
    if(!token) {
        res.status(401).json({
    error: 'Access denied. No token provided.'});
    return;
        }
    token = token.split(' ')[1];
    jwt.verify(token, JWTSECRET,(err, decoded) =>{
     if(err) {
     res.status(400).json({
     error: 'Invalid token.'});
     return;
}
if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
res.status(400).json({ message: "Invalid user ID" });
return;
}
          
req.user = decoded;

next();
        });
    
}); 

module.exports = verifyToken;