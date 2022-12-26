// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../common/config/db");

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function getWordlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  console.log(session.user);
  db.query("SELECT * FROM WORD_TB", function (err: any, result: any) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
