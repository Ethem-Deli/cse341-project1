require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const apiRouter = require("./routes/index");

const app = express();
app.use(express.json());
app.use(cors());

// Mount API router
app.use("/", apiRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error("MONGODB_URL not set. Create .env or configure Render env var.");
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

module.exports = app;
