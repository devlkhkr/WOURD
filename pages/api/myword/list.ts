// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
const db = require("../../../common/config/db");

export default async function getMyWordlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  db.query(
    "SELECT " +
      "USER_WORD_TB.user_word_key," +
      "USER_TB.user_id," +
      "USER_WORD_TB.word_id," +
      "USER_TB.user_prf_img," +
      "USER_TB.user_nickname," +
      "WORD_TB.word_name," +
      "WORD_TB.word_unravel," +
      "WORD_TB.word_desc," +
      "USER_WORD_TB.word_state," +
      "USER_WORD_TB.state_modified_date," +
      "WORD_TB.word_reg_userid," +
      "WORD_TB.word_is_cs_flag," +
      "WORD_TB.word_is_web_flag," +
      "WORD_TB.word_is_ntv_flag" +
      ", IF(USER_WORD_TB.word_state = 's', FALSE, TRUE) as active_state_flag " +
      ", TRUE as active_cate_flag " +
      "FROM USER_WORD_TB LEFT OUTER JOIN WORD_TB ON USER_WORD_TB.word_id = WORD_TB.word_id LEFT JOIN USER_TB ON WORD_TB.word_reg_userid = USER_TB.user_id WHERE USER_WORD_TB.user_id='" +
      session.user.email +
      "' AND word_use_flag=1 ORDER BY state_modified_date desc",
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
