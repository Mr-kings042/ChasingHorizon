
const mongoose = require('mongoose');

const { PhotoSchema } = require('./Photo'); 

const UserSchema = new mongoose.Schema({
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
  type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
    required: false
  },
  archive: {
    type: Boolean,
    default: false
  },
 },

 {
  timestamps: true
}
);


module.exports = mongoose.model('User', UserSchema);