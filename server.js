require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const contactsRoutes = require("./routes/contacts");
const tasksRoutes = require("./routes/tasks");

const app = express();
app.use(express.json());
app.use(cors());

// Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount routes (these URIs match Swagger)
app.use("/api/contacts", contactsRoutes);
app.use("/api/tasks", tasksRoutes);

// Basic health endpoint
app.get("/", (req, res) => res.json({ ok: true }));

// Global error handler (fallback)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGODB_URL;
if (!MONGO_URL) {
  console.error("MONGO_URL not set. Create .env or configure Render env var.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
