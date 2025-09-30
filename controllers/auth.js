const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10);

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

exports.register = async (req, res, next) => {
   //#swagger.tags = ['Auth']
  /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email and password. Automatically logs in the user (session-based).
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered and logged in
 *       400:
 *         description: Email already registered or missing fields
 */
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "User with that email already exists" });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      provider: "local",
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

exports.login = async (req, res) => {
  //#swagger.tags = ['Auth']
  /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Login using email and password (session-based). No token needed.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// OAuth callback handler: used after passport authenticates and attaches req.user
exports.oauthCallback = async (req, res) => {
  /**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handles the callback from Google OAuth after successful authentication.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: OAuth login successful (returns JWT token)
 *       400:
 *         description: No user profile received
 *       500:
 *         description: Server error
 */
  try {
    // passport should have put the user on req.user
    const user = req.user;
    if (!user) return res.status(400).json({ error: "No user from OAuth provider" });
    const token = signToken(user);
    // For API clients, returning JSON with token is convenient.
    // If you prefer redirecting to a frontend, change to res.redirect('...').
    res.json({ message: "OAuth login successful", token, user: { id: user._id, email: user.email, firstName: user.firstName } });
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.logout = async (req, res) => {
   //#swagger.tags = ['Auth']
  /**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Destroys the session and logs out the user.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

  // With JWTs there's no server-side logout unless you implement token revocation.
  // Instruct client to delete token.
  res.json({ message: "Logout: please delete your token on client" });
};

exports.googleFailure = (req, res) => {
  /**
 * @swagger
 * /auth/google/failure:
 *   get:
 *     summary: Google OAuth failure
 *     description: Called when Google authentication fails.
 *     tags:
 *       - Auth
 *     responses:
 *       401:
 *         description: Google authentication failed
 */
  res.status(401).json({ error: "Google authentication failed" });
};
