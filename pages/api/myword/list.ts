// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../common/config/db");

export default function setUserHistory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db.query(
    "SELECT " +
      "user_word_key," +
      "user_id," +
      "word_name," +
      "word_unravel," +
      "word_desc," +
      "word_reg_userid" +
      " FROM USER_WORD_TB, WORD_TB WHERE user_id='" +
      req.body.params.userId +
      "' AND word_use_flag=1",
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
