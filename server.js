const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const generateOTPRoutes = require('./routes/generate-otp');
const verifyOTPRoutes = require('./routes/verify-otp');

const app = express();
const PORT = 5000;

// Load SSL Certificates
const options = {
  key: fs.readFileSync('./cert/key.pem'), // Path to your private key
  cert: fs.readFileSync('./cert/cert.pem'), // Path to your certificate
};

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', signupRoutes);
app.use('/api', loginRoutes);
app.use('/api', generateOTPRoutes);
app.use('/api', verifyOTPRoutes);

// Start the Server
https.createServer(options, app).listen(PORT, () => {
  console.log(`Secure server running at https://localhost:${PORT}`);
});
