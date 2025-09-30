const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/auth");

// POST Register
router.post("/register", authController.register);
// POST Login
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

// GitHub OAuth entrypoint
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })
);

// GitHub OAuth callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/auth/google/failure",
  }),
  authController.oauthCallback
);

// logout endpoint (just instruct client to delete token)
router.get("/logout", authController.logout);

// failure endpoint
router.get("/google/failure", authController.googleFailure);

module.exports = router;
