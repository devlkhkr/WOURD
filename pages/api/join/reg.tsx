// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../common/config/db");

export default function RegistUser(req: NextApiRequest, res: NextApiResponse) {
  db.query(
    "INSERT INTO USER_TB (" +
      "user_seq," +
      "user_id," +
      "user_password," +
      "user_salt," +
      "user_nickname," +
      "user_prf_img," +
      "user_join_date" +
      ") VALUES (" +
      "null, '" +
      req.body.joinUserData.email +
      "','" +
      req.body.joinUserData.pw +
      "','" +
      req.body.joinUserData.salt +
      "','" +
      req.body.joinUserData.name +
      "','" +
      req.body.joinUserData.prfImg +
      "'," +
      "NOW())",
    function (err: any, data: any) {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
}
