const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");

module.exports = function configurePassport() {
  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0] && profile.emails[0].value;
          const firstName = profile.name && profile.name.givenName;
          const lastName = profile.name && profile.name.familyName;
          const providerId = profile.id;
          const user = await User.findOrCreateOAuth({
            email,
            provider: "google",
            providerId,
            firstName,
            lastName,
          });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // GitHub OAuth Strategy
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL || "/auth/github/callback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // GitHub may provide multiple emails; prefer the primary/certified one
          let email = null;
          if (profile.emails && profile.emails.length) {
            email = profile.emails.find(e => e.primary && e.verified)?.value || profile.emails[0].value;
          }
          const firstName = profile.displayName || profile.username || "";
          const lastName = "";
          const providerId = profile.id;
          const user = await User.findOrCreateOAuth({
            email,
            provider: "github",
            providerId,
            firstName,
            lastName,
          });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Minimal serialize/deserialize (used if sessions enabled)
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
