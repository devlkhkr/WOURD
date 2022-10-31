export {};
const mysql = require("mysql");
let db;

try {
  db = mysql.createConnection({
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PW,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    port: process.env.NEXT_PUBLIC_DB_PORT,
    database: process.env.NEXT_PUBLIC_DB_DATABASE,
    charset: process.env.NEXT_PUBLIC_DB_CHARSET,
  });
} catch (err) {
  console.error(err);
}

module.exports = db;
