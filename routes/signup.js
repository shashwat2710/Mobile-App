const express = require('express');
const pool = require('../db'); // Import database connection
const bcrypt = require('bcryptjs'); // To hash passwords

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate Inputs
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({ message: 'Only Gmail emails are allowed.' });
  }

  try {
    // Check if the email already exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await pool.query(
      'INSERT INTO users (username, email, password, isFirstTimeLogin) VALUES ($1, $2, $3, $4)',
      [username, email, hashedPassword, true]
    );

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

module.exports = router;