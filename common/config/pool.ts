export {}
const mysql = require('mysql');

console.log("pool")
const pool = mysql.createPool({
  connectionLimit: 50,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PW,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: process.env.NEXT_PUBLIC_DB_PORT,
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
  charset: process.env.NEXT_PUBLIC_DB_CHARSET,
});

module.exports = pool;
