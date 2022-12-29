// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../common/config/db");

export default function RegistUser(req: NextApiRequest, res: NextApiResponse) {
  db.query(
    "INSERT INTO WORD_TB " +
      "VALUES (" +
      "null, '" +
      req.body.wordRegistData.wordId + //word_id
      "','" +
      req.body.wordRegistData.wordTit + //word_name
      "','" +
      req.body.wordRegistData.wordIntlFlag + //intl_flag
      "','" +
      req.body.wordRegistData.wordUnravel + //word_unravel
      "','" +
      req.body.wordRegistData.wordDesc + //word_desc
      "','" +
      req.body.wordRegistData.userId + //word_reg_user
      "'," +
      "CURRENT_TIMESTAMP" + //word_reg_date
      ",'" +
      "1" + //word_use_flag
      "','" +
      req.body.wordRegistData.wordCtgr[0] + //word_is_cs_flag
      "','" +
      req.body.wordRegistData.wordCtgr[1] + //word_is_web_flag
      "','" +
      req.body.wordRegistData.wordCtgr[2] + //word_is_ntv_flag
      "')",
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
