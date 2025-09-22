const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Temporary "fake login"
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // For demo: accept any username/password
  // Replace with real DB user lookup & bcrypt.compare in production
  if (username !== 'admin' || password !== 'password123') {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const payload = {
    userId: '123',
    username,
    role: 'admin'
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
