// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../common/config/db");

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

const getCateFlagQuery = (cateFlags: object | null | undefined) => {
  if (cateFlags) {
    const transition = "SELECT * FROM WORD_TB WHERE";
    let query = transition;
    Object.entries(cateFlags).map((oIterable: Array<any>, index: number) => {
      query +=
        oIterable[1] === 1
          ? `${query == transition ? "" : " OR"} ${oIterable[0].replace(
              "user_main",
              "word_is"
            )}=1`
          : "";
    });
    return query;
  } else {
    console.error("세션 에러:::메인 카드 카테고리 옵션 쿼리 제너레이터");
    return "";
  }
};

const getStateFlagQuery = (stateFlags: object | null | undefined) => {
  if (stateFlags) {
    const transition = " AND word_state NOT IN (";
    let query = transition;
    Object.entries(stateFlags).map((oIterable: Array<any>, index: number) => {
      query += oIterable[1] === 0 ? `'${oIterable[0][10]}'` : "";
      query += index === Object.keys(stateFlags).length - 1 ? ")" : "";
    });
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
  console.log(session.user.mainWordExpOpts);
  const ReqFullQuery =
    getCateFlagQuery(session.user.mainWordExpOpts?.cateFlags) +
    // getStateFlagQuery(session.user.mainWordExpOpts?.stateFlags) +
    " ORDER BY RAND ()";
  console.log(ReqFullQuery);
  db.query(ReqFullQuery, function (err: any, result: any) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
