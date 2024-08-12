const asynchandler = require('express-async-handler');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const bucket = admin.storage().bucket();

const uploadPhoto = asynchandler(async(req,res)=>{
    if(!req.file){
        res.status(400).json({message:'Please upload a file'});
        return;
    }
})