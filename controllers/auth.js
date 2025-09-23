const jwt = require("jsonwebtoken");
const User = require("../models/user"); // make sure you have a User model
// bcrypt should be used in your User model for password comparison

//#swagger.tags = ["Authentication"]
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    // Check password (assuming bcrypt in model)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid username or password" });

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
