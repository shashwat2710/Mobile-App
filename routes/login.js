const express = require('express');
const pool = require('../db'); // Import database connection
const bcrypt = require('bcryptjs'); // To compare hashed passwords
const validateEmail = require('./middleware/validateEmail');

const router = express.Router();

// Login Route
router.post('/login', validateEmail,async (req, res) => {
  const { email, password } = req.body;

  // Validate Inputs
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful.', user: { email, username: user.rows[0].username } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

module.exports = router;