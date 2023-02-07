// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("common/config/db");

export default function getUserSalt(req: NextApiRequest, res: NextApiResponse) {
  const objSaltInfo = {
    dupLeng: 0,
    salt: "",
  };
  db.query(
    `SELECT * FROM USER_TB WHERE user_id='${req.body.loginUserId}'`,
    function (err: any, data: any) {
      if (!err) {
        objSaltInfo.dupLeng = data.length;
        if (data.length === 1) {
          objSaltInfo.salt = data[0].user_salt;
        }
        res.send(objSaltInfo);
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
}
