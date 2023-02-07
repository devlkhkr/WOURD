// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("common/config/db");

export default function setCardState(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db.query(
    `SELECT * FROM USER_TB WHERE user_id='${req.body.joinUserData.email}'`,
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
