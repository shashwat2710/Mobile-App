// middleware/validateEmail.js
const db = require('../../db'); // Adjust the path to your database config

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Email does not exist.' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error validating email:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = validateEmail;