const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts & Users API",
    description: "API for managing contacts and users",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
// Note: To generate the swagger.json file, run this file with Node.js
// Command: node swagger.js
// This will create or update the swagger.json file based on the routes defined in endpointsFiles
// You can then use this swagger.json file with Swagger UI to visualize and interact with the API