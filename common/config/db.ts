export {};
const mysql = require('mysql');

let pool = mysql.createPool({
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PW,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: process.env.NEXT_PUBLIC_DB_PORT,
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
  charset: process.env.NEXT_PUBLIC_DB_CHARSET,
});

const db = {
  query : (query:string, callback:Function) => {
    db.getConnection((conn:any)=>{
      conn.query(query, callback)
      conn.release();
    })
  },
  getConnection : (callback:Function)=>{
    pool.getConnection((err:Error, conn:any)=>{ 
      if(err)throw err;
      callback(conn);
    });
  }
}

module.exports = db; //db객체 반환