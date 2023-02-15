// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");

const getRandomString = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const stringLength = 6;
  let randomstring = "";
  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
};

export default function sendMailAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user_email = req.body.joinUserData.email;
  let randomAuthCode = getRandomString();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    prot: 587,
    host: "smtp.gmlail.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: "devlkhkr@gmail.com",
      pass: process.env.NEXT_PUBLIC_DB_NODEMAILER_PW,
    },
  });

  let info = transporter.sendMail({
    from: "Team CIDict <admin@cidict.co.kr>",
    to: user_email,
    subject: "[CIDict] 인증코드 입니다",
    text: `인증번호 : ${randomAuthCode}\n\n회원가입 인증코드 입력란에 위의 코드를 올바르게 입력해주세요. 대소문자를 구분합니다.\n\n유효시간 10분, 타인 유출 금지.`,
  });

  info.then(function (data: any) {
    let connectObject = {
      data: data,
      authCode: randomAuthCode,
    };
    // console.log(connectObject);
    res.send(connectObject);
  });
}
