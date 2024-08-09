const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const dBUrl = process.env.DB_URI;
const connectDB = require('./config/dbConfig');
connectDB();


const JWTSECRET = process.env.JWTSECRET;
app.use(express.json());
app.get('/health', (req,res) => {
    res.status(200).send({message: 'Server is running'});
});


app.use('/v1/user/', require('./routes/v1/user'));
app.use('/v1/auth/', require('./routes/v1/auth'));


app.listen(port,() => {
    console.log(`The server is running on port; http://localhost: ${port}...`);
});