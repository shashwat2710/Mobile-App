const { Pool } = require('pg');

// Configuration for PostgreSQL Database
const pool = new Pool({
  user: 'postgres',            // Replace with your DB username
  host: 'database-1.c3qoeqys8y1o.us-east-1.rds.amazonaws.com', // AWS RDS endpoint
  database: 'user-management',     // Replace with your DB name
  password: 'Hiramani818',       // Replace with your DB password
  port: 5432,   
  ssl: {
    rejectUnauthorized: false // Change this if using a valid certificate
  }                   // Default PostgreSQL port
});

// Test Connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the PostgreSQL database!');
  }
  release();
});

module.exports = pool;