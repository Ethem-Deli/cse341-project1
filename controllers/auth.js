const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // adjust if your model path differs
const SALT_ROUNDS = 10;

function signToken(user) {
  //#swagger.tags=["Auth"]
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
     //#swagger.tags=["Auth"]
  /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email and password.
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
 *         description: User registered successfully
 *       400:
 *         description: Email already registered or missing fields
 *       500:
 *         description: Server error
 */
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });

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
      user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
       //#swagger.tags=["Auth"]
  /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Login using email and password to receive a JWT token.
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
 *       500:
 *         description: Server error
 */
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user);
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.oauthCallback = async (req, res) => {
       //#swagger.tags=["Auth"]
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
    const profile = req.user;
    if (!profile) {
      return res.status(400).json({ error: "OAuth callback received no user from passport" });
    }

    let user;
    if (profile.email) {
      user = await User.findOne({ email: profile.email });
    } else if (profile._json && profile._json.email) {
      user = await User.findOne({ email: profile._json.email });
    }

    if (!user) {
      const email = profile.email || (profile._json && profile._json.email);
      const firstName = profile.givenName || profile.name?.givenName || profile._json?.given_name;
      const lastName = profile.familyName || profile.name?.familyName || profile._json?.family_name;
      user = new User({
        firstName: firstName || "Google",
        lastName: lastName || "User",
        email: email || `google-${Date.now()}@example.com`,
        password: null,
        oauthProvider: "google",
      });
      await user.save();
    }

    const token = signToken(user);

    const redirectTo = process.env.OAUTH_SUCCESS_REDIRECT || null;
    if (redirectTo) {
      const sep = redirectTo.includes("?") ? "&" : "?";
      return res.redirect(`${redirectTo}${sep}token=${token}`);
    }

    res.json({ message: "OAuth login successful", token });
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.googleFailure = (req, res) => {
       //#swagger.tags=["Auth"]
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
