const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/auth");

/* POST Register
   #swagger.tags = ["Auth"]
*/
router.post("/register", authController.register);
/* POST Login
   #swagger.tags = ["Auth"]
*/
router.post("/login", authController.login);

// Google OAuth entrypoint
/* 
  #swagger.tags = ["Auth"]  
*/
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google OAuth callback
/* 
  #swagger.tags = ["Auth"]  
*/
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google/failure",
  }),
  authController.oauthCallback // signs JWT & respond/redirect
);

// Optional logout endpoint (just instruct client to delete token)
/* 
  #swagger.tags = ["Auth"]  
*/
router.get("/logout", (req, res) => {
  req.logout?.(); // only if using sessions
  res.json({ message: "Logged out" });
});

// Google OAuth failure
/* 
  #swagger.tags = ["Auth"]  
*/
router.get("/google/failure", authController.googleFailure);

module.exports = router;
