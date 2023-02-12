// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("common/config/db");

export default function setCardState(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query.userName)
  db.query(
    `SELECT user_nickname FROM USER_TB WHERE user_nickname='${req.query.userName}'`,
    function (err: any, data: any) {
      console.log(data)
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
}
