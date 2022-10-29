import React from "react";
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
import Hash from "../atoms/Hash";

import { useDispatch } from "react-redux";
import { UserData, setUserData } from "redux/slices/user";

interface LoginTypes {
  setIsTokenLive: Function;
}

const LoginStyled = styled.form<LoginTypes>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 19998;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #fff;
  overflow: hidden;
  input {
    margin-top: 8px;
  }
  button {
    margin-top: 16px;
  }
`;

const LoginComponent: React.FC<LoginTypes> = ({ setIsTokenLive }) => {
  const dispatch = useDispatch();
  const idInput: any = useRef();
  const pwInput: any = useRef();
  const loginButtonClick = async () => {
    if (loginUserId.length <= 0) {
      alert("아이디를 입력하세요");
      idInput.current.focus();
    } else if (loginUserPw.length <= 0) {
      alert("비밀번호를 입력하세요");
      pwInput.current.focus();
    } else {
      Hash.makePasswordHashed(loginUserId, loginUserPw).then(
        (hashedPw: string | boolean) => {
          startLogin(loginUserId, hashedPw);
        }
      );
    }
  };
  const startLogin = async (userId: string, hashedPw: string | boolean) => {
    if (hashedPw) {
      const res = await axios.post(
        "http://localhost:9090" + "/api/user/log/in",
        {
          loginUserData: {
            id: userId,
            pw: hashedPw,
          },
        }
      );
      if (res.data.loginFlag === true) {
        dispatch(
          setUserData({
            id: res.data.userInfo.id,
            nickName: res.data.userInfo.nickName,
            prfImg: res.data.userInfo.prfImg,
            lastLogin: res.data.userInfo.lastLogin,
          } as UserData)
        );
        insertLoginData(loginUserId, 1);
        setIsTokenLive(res.data.loginFlag);
      } else {
        alert(res.data);
      }
    }
  };

  const insertLoginData = async (userId: string) => {
    const res = await axios.post(
      "http://localhost:9090" + "/api/user/log/history",
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
      {joinPageOpened ? (
        <Join
          setJoinPageOpened={setJoinPageOpened}
          startLogin={startLogin}
          insertLoginData={insertLoginData}
        />
      ) : (
        <></>
      )}
      <LoginStyled setIsTokenLive={setIsTokenLive}>
        <Logo mainColor="var(--color-point)" subColor="#231815" />
        <Fieldset>
          <InputText
            type="text"
            placeHolder="이메일을 입력하세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginUserId(e.currentTarget.value);
            }}
            reference={idInput}
          />
          <InputText
            type="password"
            placeHolder="패스워드를 입력하세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginUserPw(e.currentTarget.value);
            }}
            reference={pwInput}
          />
          <Button
            onClick={loginButtonClick}
            desc="로그인"
            height="48px"
            color="#fff"
            backgroundColor="var(--color-point)"
          />
        </Fieldset>
        <Typo
          fontSize="14px"
          color="rgba(0,0,0,.5)"
          onClick={(e) => setJoinPageOpened(true)}
        >
          회원가입
        </Typo>
      </LoginStyled>
    </>
  );
};

LoginComponent.defaultProps = {};

export default LoginComponent;
