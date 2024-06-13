const mongoose = require('mongoose');
const {photoSchema} = require('./Photo');
const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        min: 6,
        max: 300
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 300
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024
            },
            
            profilePicture: {
                type: photoSchema,
                required: false
                },

},

{timestamps: true }

);

module.exports = mongoose.model('User', userSchema);

