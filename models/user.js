const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: false },
  lastName: { type: String, trim: true, required: false },
  email: { type: String, required: true, unique: true, lowercase: true, match: /.+\@.+\..+/ },
  password: { type: String }, // optional for OAuth users
  role: { type: String, enum: ["admin", "user"], default: "user" },
  provider: { type: String, default: "local" }, // "local", "google", "github", ...
  providerId: { type: String, default: null }, // id from OAuth provider
  bio: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving (only for local users)
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    if (!this.password) return next();
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Helper: find or create user from OAuth profile
userSchema.statics.findOrCreateOAuth = async function ({ email, provider, providerId, firstName, lastName }) {
  const User = this;
  if (!email) {
    // Some providers might not provide email; in that case, create using providerId
    email = `${providerId}@${provider}.local`;
  }
  let user = await User.findOne({ $or: [{ email }, { provider, providerId }] });
  if (user) {
    // Ensure provider info is set
    let changed = false;
    if (user.provider !== provider) { user.provider = provider; changed = true; }
    if (!user.providerId && providerId) { user.providerId = providerId; changed = true; }
    if (firstName && !user.firstName) { user.firstName = firstName; changed = true; }
    if (lastName && !user.lastName) { user.lastName = lastName; changed = true; }
    if (changed) await user.save();
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
