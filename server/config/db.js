const mysql = require('mysql');
const db = mysql.createPool({
  host     : 'copubdb.cf6qeul68kjk.ap-northeast-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'dlrkdgudrlaxodbs',
  database : 'COPUBDB',
  charset : 'utf8mb4'
});
module.exports = db;