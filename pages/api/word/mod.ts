import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
const db = require("common/config/db");

export default async function registWord(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  if (session?.user?.email != req.body.wordRegistData.regUserId) {
    res.status(401).json({ message: "Permission Denied" });
    return;
  }
  db.query(
    "UPDATE WORD_TB SET" + 
      " word_name='" +
      req.body.wordRegistData.wordTit +
      "', " +
      "word_intl_flag=" +
      req.body.wordRegistData.wordIntlFlag + //intl_flag
      ", " +
      "word_unravel='" +
      req.body.wordRegistData.wordUnravel + //word_unravel
      "', " +
      "word_desc='" +
      req.body.wordRegistData.wordDesc + //word_desc
      "', " +
      "word_is_cs_flag=" +
      req.body.wordRegistData.wordCtgr[0] + //word_is_cs_flag
      ", " +
      "word_is_web_flag=" +
      req.body.wordRegistData.wordCtgr[1] + //word_is_web_flag
      ", " +
      "word_is_ntv_flag=" +
      req.body.wordRegistData.wordCtgr[2] + //word_is_ntv_flag
      " WHERE word_id='" +
      req.body.wordRegistData.wordId +
      "'"
      ,
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
