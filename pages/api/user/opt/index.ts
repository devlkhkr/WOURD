// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
const db = require("common/config/db");

export default async function setUserOpt(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  db.query(
    "UPDATE " +
      "USER_TB SET " +
      `${req.body.column}=${req.body.value}` +
      " WHERE user_id='" +
      session.user.email +
      "'",
    function (err: any, data: any) {
      if (!err && data.length === 1) {
        res.send(true);
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
}
