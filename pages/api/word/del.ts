// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { json } from "stream/consumers";
const db = require("common/config/db");

export default async function delWord(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  let reqBody = JSON.parse(req.body);
  let isOwner = session.user.email === reqBody.wordOwnerId;

  !isOwner ? (() => {
    res.statusMessage = "Permission denied"
    res.status(401).end()
  })() : (() => {
    db.query(
      "UPDATE " +
        "WORD_TB SET word_use_flag=0 WHERE word_id='" +
        reqBody.wordId +
        "'",
      function (err: any, data: any) {
        if (!err && data.length === 1) {
          res.send(true);
        } else {
          console.log(err);
          res.send(err);
        }
      }
    )
  })();
}
