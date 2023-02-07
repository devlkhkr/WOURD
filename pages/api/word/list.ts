import type { NextApiRequest, NextApiResponse } from "next";
const db = require("common/config/db");

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

const getCateFlagQuery = (cateFlags: object | null | undefined) => {
  if (cateFlags) {
    const transition =
      // "SELECT DISTINCT" +
      "SELECT " +
      "word_seq, word_id, word_name, word_intl_flag, word_unravel, " +
      "word_desc, word_reg_userid, user_prf_img, user_nickname, word_reg_date, " +
      "word_use_flag, word_is_cs_flag, word_is_web_flag, word_is_ntv_flag " +
      "FROM WORD_TB LEFT JOIN USER_TB ON WORD_TB.word_reg_userid = USER_TB.user_id WHERE (" +
      "";
    let query = transition;
    Object.entries(cateFlags).map((oIterable: Array<any>, index: number) => {
      query +=
        oIterable[1] === 1
          ? `${query == transition ? "" : " OR"} ${oIterable[0].replace(
              "user_main",
              "word_is"
            )}=1`
          : "";
      query += index === Object.keys(cateFlags).length - 1 ? ")" : "";
    });
    return query;
  } else {
    console.error("세션 에러:::메인 카드 카테고리 옵션 쿼리 제너레이터");
    return "";
  }
};

const getStateFlagQuery = (
  stateFlags: object | null | undefined,
  userId: string | null | undefined
) => {
  if (stateFlags) {
    const transition =
      " AND (word_id) NOT IN (SELECT word_id FROM USER_WORD_TB WHERE user_id='" +
      userId +
      "' AND word_state IN (";

    let query = transition;
    Object.entries(stateFlags).map((oIterable: Array<any>, index: number) => {
      let isFirst = index === 0;
      if (isFirst) {
        query += "''";
      }
      query += oIterable[1] === 0 ? `,'${oIterable[0][10]}'` : "";
    });
    query += "))";

    return query;
  } else {
    console.error("세션 에러:::메인 카드 스테이트 옵션 쿼리 제너레이터");
    return "";
  }
};

export default async function getWordlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const ReqFullQuery =
    getCateFlagQuery(session.user.mainWordExpOpts?.cateFlags) +
    getStateFlagQuery(
      session.user.mainWordExpOpts?.stateFlags,
      session.user.email
    ) +
    " ORDER BY RAND () LIMIT 100";
  db.query(ReqFullQuery, function (err: any, result: any) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
