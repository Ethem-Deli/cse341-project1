const router = require("express").Router();
const { ensureAuthenticated } = require("../middleware/ensureAuth");

// Public test route
router.get("/", (req, res) => {
  res.json({ message: "Protected route group. Try GET /protected/private or /protected/admin" });
});

// Protected route - any authenticated user
router.get("/private", ensureAuthenticated, (req, res) => {
  res.json({ message: "Hello authenticated user", user: req.user });
});

// Protected route - admin only
router.get("/admin", ensureAuthenticated, (req, res) => {
  const user = req.user || {};
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Requires admin role" });
  }
  res.json({ message: "Hello admin", user });
});

module.exports = router;
