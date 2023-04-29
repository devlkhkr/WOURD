export {};
const pool = require('./pool');

const db = {
  query: (query: string, values: any[] = []) => {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err:any, results:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = db;