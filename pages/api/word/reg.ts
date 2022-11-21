// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
const db = require("../../../common/config/db");

export default function RegistUser(req: NextApiRequest, res: NextApiResponse) {
  getSession({ req }).then((session) => {
    console.log(session?.user?.email);
  });
  console.log(req.body.wordRegistData.wordId);
  // db.query(
  //   "INSERT INTO WORD_TB " +
  //     "VALUES (" +
  //     "null, '" +
  //     req.body.joinUserData.email +
  //     "','" +
  //     req.body.joinUserData.pw +
  //     "','" +
  //     req.body.joinUserData.salt +
  //     "','" +
  //     req.body.joinUserData.name +
  //     "','" +
  //     req.body.joinUserData.prfImg +
  //     "'," +
  //     "NOW())",
  //   function (err: any, data: any) {
  //     if (!err) {
  //       res.send(data);
  //     } else {
  //       console.log(err);
  //       res.send(err);
  //     }
  //   }
  // );
}
