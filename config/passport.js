const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
//
module.exports = function configurePassport() {
    // Google OAuth Strategy
  passport.use(
    // Configure the Google strategy for use by Passport.
    // OAuth 2.0-based strategies require a `verify` function which receives the
    // credential (`accessToken`) for accessing the Google API on the user's
    new GoogleStrategy(
      {
        // Options
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Extract email and names
          const email = profile.emails && profile.emails[0] && profile.emails[0].value;
          const firstName = profile.name && profile.name.givenName;
          const lastName = profile.name && profile.name.familyName;
          const providerId = profile.id;
            // If no email, cannot proceed
          if (!email) return done(null, false, { message: "No email from Google" });
            // Find or create user
          const user = await User.findOrCreateOAuth({
            email,
            firstName,
            lastName,
            provider: "google",
            providerId,
          });
          // Successfully authenticated
          return done(null, user);
        } catch (err) {
          console.error("GoogleStrategy error:", err);
          return done(err, null);
        }
      }
    )
  );

  // passport doesn't need to serialize for JWT-only (but define no-op handlers)
  passport.serializeUser((user, done) => done(null, user.id));
  // No-op deserialize
  passport.deserializeUser((id, done) => done(null, id));
};
