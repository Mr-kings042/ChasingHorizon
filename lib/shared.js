
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const Photo = require('../models/Photo');


const bucket = admin.storage().bucket();

const createPhoto = async (file)=>{
    try{
        if(!file){
            res.status(400).json({message: 'Please upload a file'});
            return;
        }
        const filePath = path.join(__dirname, '../', file.path);
        const uploadResult = await bucket.upload(filePath, {
            destination: `photos/${file.originalname}`,
            public: true,
            metadata: {
                contentType: file.mimetype
            }
        });
        fs.unlinkSync(filePath);
    const uploadedfile = uploadResult[0];
    const publicUrl = uploadedfile.publicUrl();

    console.log('url: ', uploadedfile.publicUrl());

    // save to database
   const photo = new Photo ({
    url: publicUrl
   });
  await photo.save();
   return photo;

   
    //res.status(200).send({photo});
    } catch (error){
        console.error(error);
        throw new Error ({error: error.message});
    }

};
module.exports = createPhoto;