const mongoose = require('mongoose');

const dBUri = process.env.DB_URI;

const connectDB = async () => {
    mongoose.connect(dBUri)
        .then(() => {
            console.log('Successively Connected to Database...');
        })
        .catch((err) => {
            console.log('Failed to connect to Database...', err);
        });
}



module.exports = connectDB;