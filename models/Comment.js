const mongoose = require('mongoose');
const {UserSchema} = require('./User');

const CommentSchema = new mongoose.Schema({

    body:{
        type: String,
        required: true,  
        min: 6,
        max: 1000
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
            },
replies: {
    type: [this],
    default: [],
    required: false
},

    },
    {
        timestamps: true
        }
);

module.exports = mongoose.model('Comment', CommentSchema);