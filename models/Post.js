const mongoose = require('mongoose');
const {UserSchema} = require('./User');
const {CommentSchema} = require('./Comment');
const {photoSchema} = require('./Photo');
const {TagSchema} = require('./Tag');


const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        min: 6,
        max: 2555
        },
   
    content: {
        type: String,
        required: true,
        min: 6,
        max: 2555
        },
        user:{
            type: UserSchema,
            required: true

        },
        comments:{
            type:[CommentSchema],
            required: false
        },
        thumbnail:{
            type: photoSchema,
            required: false
        },
        photos: {
            type: [photoSchema],
            required: false
        },
   
    
},
{
    timestamps: true
    }
);

module.exports = mongoose.model('Post', PostSchema);