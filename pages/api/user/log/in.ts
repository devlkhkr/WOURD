// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default function Login(req: NextApiRequest, res: NextApiResponse) {
  db.query(
    "SELECT " +
      "user_id," +
      "user_password," +
      "user_nickname," +
      "user_prf_img," +
      /* S : 메인 단어 노출 플래그 */
      "user_main_k_flag," +
      "user_main_d_flag," +
      "user_main_f_flag," +
      "user_main_s_flag," +
      "user_main_cs_flag," +
      "user_main_web_flag," +
      "user_main_ntv_flag," +
      /* E : 메인 단어 노출 플래그 */
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
              nickName: data[0].user_nickname,
              prfImg: data[0].user_prf_img,
              mainWordExpOpts: {
                user_main_k_flag: data[0].user_main_k_flag,
                user_main_d_flag: data[0].user_main_d_flag,
                user_main_f_flag: data[0].user_main_f_flag,
                user_main_s_flag: data[0].user_main_s_flag,
                user_main_cs_flag: data[0].user_main_cs_flag,
                user_main_web_flag: data[0].user_main_web_flag,
                user_main_ntv_flag: data[0].user_main_ntv_flag,
              },
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
