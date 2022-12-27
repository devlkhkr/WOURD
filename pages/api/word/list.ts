// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../common/config/db");

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { mainWordExpOpts } from "next-auth";

const getMainWordExpQuery = (
  mainWordExpOpts: mainWordExpOpts | null | undefined
) => {
  const query =
    "SELECT " +
    "user_id," +
    "user_password," +
    "log_date " +
    "FROM USER_TB, LOG_HISTORY_TB WHERE user_id='" +
    "req.body.loginUserData.id" +
    "' && USER_TB.user_id = LOG_HISTORY_TB.log_user_id && log_action=1 ORDER BY log_date DESC LIMIT 1;";
  return "";
};

export default async function getWordlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  console.log(session.user.email);
  console.log(session.user.mainWordExpOpts);
  getMainWordExpQuery(session.user.mainWordExpOpts);
  db.query("SELECT * FROM WORD_TB", function (err: any, result: any) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
