// Import required modules
const express = require('express');
const router = express.Router();
const db = require('../db'); // Your PostgreSQL database configuration
const { check, validationResult } = require('express-validator'); // Optional for request validation
const validateEmail = require('./middleware/validateEmail');

// Verify OTP Route
router.post(
  '/verify-otp',
  [
    // Request validation (optional)
    check('email', 'Valid email is required').isEmail(),
    check('otp', 'OTP must be a string').isString(),
  ],
  validateEmail,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    try {
      // Retrieve the OTP and verification status from the database
      const result = await db.query(
        `SELECT otp, created_at, is_verified FROM otp_verification WHERE email = $1`,
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Email not found.' });
      }

      const { otp: storedOtp, created_at, is_verified } = result.rows[0];

      // Check if the OTP is already verified
      if (is_verified) {
        return res.status(400).json({ message: 'OTP already verified.' });
      }

      // Check OTP validity
      if (storedOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP.' });
      }

      // Check if OTP is expired (e.g., 5 minutes)
      const now = new Date();
      const createdAt = new Date(created_at);
      const diff = (now - createdAt) / 1000 / 60; // Difference in minutes
      if (diff < 5) {
        return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
      }

      // Update the database to mark the email as verified
      await db.query(
        `UPDATE otp_verification SET is_verified = TRUE WHERE email = $1`,
        [email]
      );

      res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'An error occurred while verifying OTP.' });
    }
  }
);

module.exports = router;