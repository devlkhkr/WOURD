// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../common/config/db");

export default function getWordlist(req: NextApiRequest, res: NextApiResponse) {
  db.query("SELECT * FROM WORD_TB", function (err: any, result: any) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
