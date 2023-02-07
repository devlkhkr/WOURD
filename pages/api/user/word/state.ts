// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("common/config/db");

export default function setCardState(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db.query(
    "INSERT INTO USER_WORD_TB (" +
      "user_word_key," +
      "user_id," +
      "word_id," +
      "word_state," +
      "state_modified_date" +
      ") VALUES ('" +
      (req.body.wordInfo.userId + req.body.wordInfo.wordId) +
      "','" +
      req.body.wordInfo.userId + //user_id
      "','" +
      req.body.wordInfo.wordId + //word_id
      "','" +
      req.body.wordInfo.wordState + //word_state
      "'," +
      "NOW()) ON DUPLICATE KEY UPDATE word_state='" +
      req.body.wordInfo.wordState +
      "', state_modified_date=NOW()",
    function (err: any, data: any) {
      if (!err) {
        res.send({
          state: req.body.wordInfo.wordState,
          queryResult: data,
        });
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
}
