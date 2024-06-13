const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.get('/health', (req,res) => {
    res.status(200).send({message: 'Server is running'});
});
app.listen(port,() => {
    console.log(`The server is running on port; http://localhost: ${port}...`);
});