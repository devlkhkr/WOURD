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
      "word_state," +
      "state_modified_date," +
      "word_reg_userid" +
      " FROM USER_WORD_TB LEFT OUTER JOIN WORD_TB ON USER_WORD_TB.word_id = WORD_TB.word_id WHERE user_id='" +
      req.body.params.userId +
      "' AND NOT word_state='s' AND word_use_flag=1 ORDER BY state_modified_date desc",
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