import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../common/config/db");

export default async function getMyWordlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db.query(
    `SELECT * FROM WORD_TB WHERE word_id='${req.query.wordId}'`,
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
