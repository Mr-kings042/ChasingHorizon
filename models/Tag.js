const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 500
        },
    description: String,

}, 
{ timestamps: true }
);
module.exports = mongoose.model('Tag', TagSchema);