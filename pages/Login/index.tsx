import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "pages/components/atoms/Logo";
import InputText from "pages/components/atoms/InputText";
import Typo from "pages/components/atoms/Typo";
import Button from "pages/components/atoms/Button";
import Fieldset from "pages/components/molecules/Fieldset";
import Form from "pages/components/organisms/Form";
import Join from "pages/components/templates/Join";
import { useState, useRef } from "react";
import axios from "axios";
import Hash from "../../functional/functions/Hash";

import { useDispatch } from "react-redux";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { store } from "redux/store";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { newConfirm } from "pages/components/templates/Confirm";

interface LoginTypes {
  isLoginPage?: boolean;
}

export function needLogin() {
  newConfirm({
    confirmText: "로그인이 필요한 서비스입니다.",
    submitTit: "로그인",
    confirmSubmit: () => {
      signIn();
    },
  });
}

const LoginStyled = styled.form<LoginTypes>`
  width: 100%;
  height: 100%;
  z-index: 19998;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    display: inline-block;
    width: 100%;
    max-width: 720px;
    height: 100%;
    background-image: url(../images/bg_login.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center bottom 20px;
    z-index: -1;
    opacity: 0.5;
    pointer-events: none;
  }
  input {
    margin-top: 8px;
  }
  button {
    margin-top: 16px;
  }
`;

const WelcomeMsgStyled = styled.div`
  p {
    font-size: 20px;
    font-weight: var(--weight-light);
    color: var(--color-darkblue);
    line-height: 1.25;
    span {
      font-size: 18px;
    }
    strong {
      font-weight: var(--weight-bold);
    }
  }
`;

const LoginWithOtherSys = styled.div`
  button {
  }
`;

const LoginComponent: NextPage<LoginTypes> = ({ isLoginPage }) => {
  const idInput: any = useRef();
  const pwInput: any = useRef();
  const btnLogin: any = useRef();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  const startLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUserId.length <= 0) {
      alert("아이디를 입력하세요");
      idInput.current.focus();
      return;
    } else if (loginUserPw.length <= 0) {
      alert("비밀번호를 입력하세요");
      pwInput.current.focus();
      return;
    } else {
      Hash.makePasswordHashed(loginUserId, loginUserPw).then(
        async (hashedPw: string | boolean) => {
          if (hashedPw) {
            const res: any = await signIn("credentials", {
              loginUserId,
              hashedPw,
              redirect: false,
            });
            if (res.error === "CredentialsSignin") {
              alert("아이디 또는 비밀번호를 확인하세요.");
            } else if (res.status === 200 && res.error === null) {
              console.log("LogIn Succeed");
            } else {
              console.log("예외오류:::", res);
            }
          }
        }
      );
    }
  };

  const insertLoginData = async (userId: string) => {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_ORIGIN + "/api/user/log/history",
      {
        loginUserData: {
          logUserId: userId,
          logAction: 1,
        },
      }
    );
    let logInsertResult = res.data.affectedRows === 1 ? "true" : "false";
    console.log(`로그인 기록 Insert : ${logInsertResult}`);
  };

  const [joinPageOpened, setJoinPageOpened] = useState(false);
  const [loginUserId, setLoginUserId] = useState("");
  const [loginUserPw, setLoginUserPw] = useState("");

  return (
    <>
      <NextSeo
        title="Wourd Login"
        description="Wourd Login Page"
        openGraph={{
          type: "website",
          url: process.env.NEXT_PUBLIC_ORIGIN + "/Login",
          title: "Wourd Login page",
          description: "wourd login page",
        }}
      />

      {joinPageOpened ? (
        <Join
          setJoinPageOpened={setJoinPageOpened}
          signIn={signIn}
          insertLoginData={insertLoginData}
        />
      ) : (
        <></>
      )}
      <LoginStyled onSubmit={startLogin}>
        {/* <Logo mainColor="var(--color-point)" subColor="#231815" /> */}
        <WelcomeMsgStyled>
          <p>
            <span>함께 만들어가는 단어장</span>
            <br /> <strong>WOURD</strong> 에 오신 것을 환영합니다 :)
          </p>
        </WelcomeMsgStyled>

        <Fieldset>
          <InputText
            type="text"
            placeHolder="이메일을 입력하세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginUserId(e.currentTarget.value);
            }}
            reference={idInput}
            className="input_bg_email"
          />
          <InputText
            type="password"
            placeHolder="패스워드를 입력하세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginUserPw(e.currentTarget.value);
            }}
            reference={pwInput}
            className="input_bg_pw"
          />
          <Button
            type="submit"
            desc="로그인"
            height="48px"
            color="#fff"
            backgroundColor="var(--color-point)"
            reference={btnLogin}
          />
        </Fieldset>
        <Typo
          fontSize="14px"
          color="var(--color-grey)"
          onClick={(e) => setJoinPageOpened(true)}
          textAlign="center"
          lineClamp="1"
        >
          회원가입
        </Typo>
        {/* <LoginWithOtherSys>
          <Button
            type="submit"
            desc="카카오로 로그인"
            height="48px"
            color="#333"
            backgroundColor="#fada0a"
            onClick={() => signIn("kakao")}
          />
        </LoginWithOtherSys> */}
      </LoginStyled>
    </>
  );
};

LoginComponent.defaultProps = {
  isLoginPage: true,
};

export default LoginComponent;
