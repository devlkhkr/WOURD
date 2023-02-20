import type { NextApiRequest, NextApiResponse } from "next";
const db = require("common/config/db");

import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function getWordlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db.query("SELECT " +
  "word_seq, word_id, word_name, word_intl_flag, word_unravel, " +
  "word_desc, word_reg_userid, user_prf_img, user_nickname, word_reg_date, " +
  "word_use_flag, word_is_cs_flag, word_is_web_flag, word_is_ntv_flag " +
  "FROM WORD_TB LEFT JOIN USER_TB ON WORD_TB.word_reg_userid = USER_TB.user_id ORDER BY RAND () LIMIT 1", function (err: any, result: any) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
