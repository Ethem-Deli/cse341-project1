const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SALT_ROUNDS = 10;

function signToken(user) {
  const payload = {
    sub: user._id.toString(),
    email: user.email,
    role: user.role || "user",
  };
  const secret = process.env.JWT_SECRET || "dev_secret";
  const opts = { expiresIn: "7d" };
  return jwt.sign(payload, secret, opts);
}

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashed,
      role: role || "user",
    });

    await user.save();

    const token = signToken(user);
    res.status(201).json({
      message: "User registered",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
