// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default function login(req: NextApiRequest, res: NextApiResponse) {
  db.query(
    "SELECT " +
      "user_id," +
      "user_password," +
      "log_date " +
      "FROM USER_TB, LOG_HISTORY_TB WHERE user_id='" +
      req.body.loginUserData.id +
      "' && USER_TB.user_id = LOG_HISTORY_TB.log_user_id && log_action=1 ORDER BY log_date DESC LIMIT 1;",
    function (err: any, data: any) {
      if (!err && data.length === 1) {
        if (req.body.loginUserData.pw == data[0].user_password) {
          res.send({
            loginFlag: true,
            userInfo: {
              id: data[0].user_id,
              lastLogin: data[0].log_date,
            },
          });
        } else {
          res.send("비밀번호가 일치하지 않습니다.");
        }
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
}
