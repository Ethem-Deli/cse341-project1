const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=["Hello World"]
  res.send("Hello World!");
});
// All routes in routes/auth.js should have #swagger.tags=["Authentication"]
router.use("/auth", require("./auth")); // Authentication routes
router.use("/users", require("./users"));// User management routes
router.use("/contacts", require("./contacts"));// Contact management routes
router.use("/tasks", require("./tasks"));// Task management routes
router.use("/products", require("./products"));// Product management routes

module.exports = router;
