// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
const db = require("../../../common/config/db");

export default function RegistUser(req: NextApiRequest, res: NextApiResponse) {
  getSession({ req }).then((session) => {
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
        req.body.wordRegistData.wordUnravel + //word_desc
        "','" +
        session?.user?.email + //word_reg_user
        "','" +
        "NOW()" + //word_reg_date
        "','" +
        "1" + //word_use_flag
        "','" +
        req.body.wordRegistData.wordCtgr[0] + //word_is_cs_flag
        "','" +
        req.body.wordRegistData.wordCtgr[1] + //word_is_web_flag
        "','" +
        req.body.wordRegistData.wordCtgr[2] + //word_is_native_flag
        "')",
      function (err: any) {
        if (!err) {
          res.send(res);
        } else {
          console.log(err);
          res.send(err);
        }
      }
    );

  });
}
