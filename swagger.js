const swaggerAutogen = require("swagger-autogen")();
// Swagger configuration
const doc = {
  info: {
    title: "Contacts & Users API",
    description: "API for managing contacts and users",
  },
  
  host: "localhost:3000", // Change to your server"s host if youre using online link 
  schemes: ["http", "https"],
   components: {// Add security definitions
    securitySchemes: {// Define bearerAuth scheme
      bearerAuth: {// Name of the security scheme
        type: "http",// HTTP authentication scheme
        scheme: "bearer",// Bearer token authentication type
        bearerFormat: "JWT"// Format of the bearer token 
      }
    }
  },
  // Apply security globally to all endpoints
  security: [{ bearerAuth: [] }] // applies globally
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
// Note: To generate the swagger.json file, run this file with Node.js
// Command: node swagger.js
// This will create or update the swagger.json file based on the routes defined in endpointsFiles
// You can then use this swagger.json file with Swagger UI to visualize and interact with the API