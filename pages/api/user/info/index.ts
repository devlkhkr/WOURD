// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
const db = require("common/config/db");

export default async function getUserInfo(req: NextApiRequest, res: NextApiResponse) {
  //   const session = await unstable_getServerSession(req, res, authOptions);
  //   if (!session) {
  //     res.status(401).json({ message: "You must be logged in." });
  //     return;
  //   }
  //   console.log("session:::", session);
  db.query(
    "SELECT " +
      "user_nickname," +
      "user_prf_img," +
      /* S : 메인 단어 노출 플래그 */
      "user_main_k_flag," +
      "user_main_d_flag," +
      "user_main_f_flag," +
      "user_main_s_flag," +
      "user_main_cs_flag," +
      "user_main_web_flag," +
      "user_main_ntv_flag " +
      /* E : 메인 단어 노출 플래그 */
      "FROM USER_TB WHERE user_id='" +
      //   session.user.email +
      req.body.email +
      "'",
    function (err: any, data: any) {
      if (data.length === 1) {
        res.send({
          userInfo: {
            nickName: data[0].user_nickname,
            prfImg: data[0].user_prf_img,
            mainWordExpOpts: {
              stateFlags: {
                user_main_k_flag: data[0].user_main_k_flag,
                user_main_d_flag: data[0].user_main_d_flag,
                user_main_f_flag: data[0].user_main_f_flag,
                user_main_s_flag: data[0].user_main_s_flag,
              },
              cateFlags: {
                user_main_cs_flag: data[0].user_main_cs_flag,
                user_main_web_flag: data[0].user_main_web_flag,
                user_main_ntv_flag: data[0].user_main_ntv_flag,
              },
            },
          },
        });
      }
    }
  );
}
