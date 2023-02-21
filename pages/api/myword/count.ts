import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
const db = require("common/config/db");

const getSttCntQuery = (userId: string) => {
  return `SELECT word_state, COUNT(word_state) AS state_count FROM COPUBDB.USER_WORD_TB WHERE user_id="${userId}" GROUP BY word_state UNION SELECT "m" as word_state, COUNT(word_reg_userid) AS word_reg_count FROM COPUBDB.WORD_TB WHERE word_reg_userid="${userId}"`;
};

export default async function getStatesCount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const ReqFullQuery: string = getSttCntQuery(session.user.email!);
  db.query(ReqFullQuery, function (err: any, result: any) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
}
