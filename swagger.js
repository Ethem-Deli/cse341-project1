const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts & Users API",
    description: "API for managing contacts, users and authentication",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  tags: [
    { name: "Auth", description: "Register" },
    { name: "Auth", description: "Login" },
    { name: "Users", description: "User management endpoints" },
    { name: "Contacts", description: "Contact management endpoints" },
    { name: "Tasks", description: "Task management endpoints" },
    { name: "Products", description: "Product management endpoints" },
  ],
};

const outputFile = "./swagger.json";
// List files that define your routes; make sure auth.js is first so /auth endpoints show at top
const endpointsFiles = ["./routes/index.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
// Note: To generate the swagger.json file, run this file with Node.js
// Command: node swagger.js
// This will create or update the swagger.json file based on the routes defined in endpointsFiles
// You can then use this swagger.json file with Swagger UI to visualize and interact with the API