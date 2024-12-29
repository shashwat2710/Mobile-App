require('dotenv').config();

const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_database_name = process.env.DATABASE_NAME;
const db_host = process.env.DB_HOST;

module.exports = { db_port, db_user, db_pass, db_database_name, db_host };