// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const db = require('../../common/config/db');
    
export default function test(
    req : NextApiRequest,
    res : NextApiResponse
  ) {
  console.log(req.body.parm1)
  db.query("SELECT * FROM USER_TB",
  function (err: any, result: any) {
      if(err) {
          console.log(err)
      } else {
        //   console.log(result);
          res.send(result);
      }
  });
}