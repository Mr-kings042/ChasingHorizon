const mongoose = require('mongoose');
const {UserSchema} = require('./User');

const CommentSchema = new mongoose.Schema({
post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
    },
  
    body:{
        type: String,
        required: true,  
        min: 6,
        max: 10000000
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
            },
// replies: {
//     type: [this],
//     default: [],
//     required: false
// },
// replies: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Comment',
//     required: false
// },

    },
    {
        timestamps: true
        }
);

module.exports = mongoose.model('Comment', CommentSchema);