// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default function setUserHistory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db.query(
    "INSERT INTO LOG_HISTORY_TB (" +
      "log_seq," +
      "log_user_id," +
      "log_action," +
      "log_date" +
      ") VALUES (" +
      "null, '" +
      req.body.loginUserData.logUserId +
      "'," +
      req.body.loginUserData.logAction +
      "," +
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
