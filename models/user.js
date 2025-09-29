const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: false },
  lastName: { type: String, trim: true, required: false },
  email: { type: String, required: true, unique: true, lowercase: true, match: /.+\@.+\..+/ },
  password: { type: String }, // optional for OAuth users
  role: { type: String, enum: ["admin", "user"], default: "user" },
  provider: { type: String, default: "local" }, // "local" or "google" etc
  providerId: { type: String, default: null }, // id from OAuth provider
  bio: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving (only for local users)
userSchema.pre("save", async function(next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare candidate password
userSchema.methods.comparePassword = function(candidate) {
  if (!this.password) return Promise.resolve(false);
  return bcrypt.compare(candidate, this.password);
};

// Helper: find or create OAuth user
userSchema.statics.findOrCreateOAuth = async function({ email, firstName, lastName, provider, providerId }) {
  const User = this;
  let user = await User.findOne({ email });
  if (user) {
    // If existing local user and providerId not set, update provider fields
    if (!user.providerId && providerId) {
      user.provider = provider;
      user.providerId = providerId;
      await user.save();
    }
    return user;
  }
  user = new User({
    email,
    firstName,
    lastName,
    provider,
    providerId,
  });
  await user.save();
  return user;
};

module.exports = mongoose.model("User", userSchema);
