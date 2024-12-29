const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

//Routes
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const generateOTPRoutes = require('./routes/generate-otp');
const verifyOTPRoutes = require('./routes/verify-otp');

const app = express();
const PORT_HTTP = 5000; // HTTP port
const PORT_HTTPS = 5443; // HTTPS port

// Load SSL Certificates
const options = {
  key: fs.readFileSync('./cert/key.pem'), // Path to your private key
  cert: fs.readFileSync('./cert/cert.pem'), // Path to your certificate
};

const corsOptions = {
  origin:"http://localhost:8081",
}

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use('/api', signupRoutes);
app.use('/api', loginRoutes);
app.use('/api', generateOTPRoutes);
app.use('/api', verifyOTPRoutes);

// Start the Server
https.createServer(options, app).listen(PORT_HTTPS, () => {
  console.log(`Secure server running at https://localhost:${PORT_HTTPS}`);
});

http.createServer(app).listen(PORT_HTTP, () => {
  console.log(`HTTP server running at http://localhost:${PORT_HTTP}`);
});
