const mysql = require('mysql2')
require('dotenv').config();

// Connects to database and uses a .env file to obtain the password
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

module.exports = db;