const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts & Users API',
    description: 'API for managing contacts and users',
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3000',
  schemes: process.env.RENDER_EXTERNAL_HOSTNAME ? ['https'] : ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // include index.js that imports all routes

swaggerAutogen(outputFile, endpointsFiles, doc);

// Run "node swagger.js" to generate swagger.json
