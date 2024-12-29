const { Pool } = require('pg');
const { db_host, db_user, db_database_name, db_pass, db_port } = require('./constant');
console.log(db_host, db_user, db_database_name, db_pass, db_port);
// Configuration for PostgreSQL Database
const pool = new Pool({
  user: db_user,            // Replace with your DB username
  host: db_host, // AWS RDS endpoint
  database: db_database_name,     // Replace with your DB name
  password: db_pass,       // Replace with your DB password
  port: db_port,   
  ssl: false               // Default PostgreSQL port
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