const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../db'); // Database connection file
const validateEmail = require('./middleware/validateEmail');
const router = express.Router();

// Generate OTP Route
router.post('/generate-otp', validateEmail,async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in the database
    await db.query(
      `INSERT INTO otp_verification (email, otp) VALUES ($1, $2)
       ON CONFLICT (email) DO UPDATE SET otp = $2, created_at = NOW(), is_verified = FALSE`,
      [email, otp]
    );

    // Send OTP to email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shashwat99.2023@gmail.com',
        pass: 'dopw gbqm fizy arui',
      },
    });

    await transporter.sendMail({
      from: 'shashwat99.2023@gmail.com',
      to: email,
      subject: 'Your OTP for Verification',
      text: `Your OTP for verification is: ${otp}`,
    });

    res.status(200).json({ message: 'OTP has been sent to your email.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
});

module.exports = router;