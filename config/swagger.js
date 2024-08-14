const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
openapi: '3.0.0',
info: {
title: 'User Blog API',
version: '1.0.0',
description: 'API for managing a blogging platform including authentication, user management, posts, tags, photos, and comments',
},
};

const options = {
swaggerDefinition,
apis: ['./routes/v1/api.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;