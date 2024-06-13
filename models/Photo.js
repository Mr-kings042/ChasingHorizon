const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
    {
url: {
    type:String,
    required:true
    },
    description:{
        type:String,
        required:true
        },
        
        
},
{timestamp: true}
);
module.exports = mongoose.model('Photo', photoSchema);