const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/auth");

 //POST Register
router.post("/register", authController.register);
//POST Login
router.post("/login", authController.login);

// Google OAuth entrypoint 
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google/failure",
  }),
  authController.oauthCallback // signs JWT & respond/redirect
);

//logout endpoint (just instruct client to delete token)
router.get("/logout", (req, res) => {
  req.logout?.(); // only if using sessions
  res.json({ message: "Logged out" });
});

//failure endpoint
router.get("/google/failure", authController.googleFailure);

module.exports = router;
