const asynchandler = require('express-async-handler');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const Photo = require('../../models/Photo');


const bucket = admin.storage().bucket();

const uploadPhoto = asynchandler(async(req,res)=>{
    try{
        if(!req.file){
            res.status(400).json({message:'Please upload a file'});
            return;
        }
        const filePath = path.join(__dirname, '../../', req.file.path);
        const uploadResult = await bucket.upload(filePath, {
            destination: `photos/${req.file.originalname}`,
            public: true,
            metadata: {
                contentType: req.file.mimetype
            }
        });
        fs.unlinkSync(filePath);
    const file = uploadResult[0];
    console.log('url: ', file.publicUrl());

    // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  
    const publicUrl = file.publicUrl();
   // save to database
   const photo = new Photo ({
    url: publicUrl
   });
   photo.save();

   
    res.status(200).send({photo});
    } catch (error){
        console.error(error);
        res.status(500).json({error: error.message});
    }

});

module.exports = {uploadPhoto};