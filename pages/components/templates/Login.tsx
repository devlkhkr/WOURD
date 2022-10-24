import React from "react";
import styled from "styled-components";
import Logo from "pages/components/atoms/Logo";
import InputText from "pages/components/atoms/InputText";
import Typo from "pages/components/atoms/Typo";
import Button from "pages/components/atoms/Button";
import Fieldset from "pages/components/molecules/Fieldset";
import Form from "pages/components/organisms/Form";
import Join from "pages/components/templates/Join"
import { useState, useRef } from "react";
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from 'redux/rootReducer';
import { UserData, setUserData } from 'redux/slices/user';

import crypto from 'crypto';

interface LoginTypes {
  setIsTokenLive: Function
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
  background-color: #f3f3f3;
  overflow: hidden;
  input{
    margin-top: 8px;
  }
  button{
    margin-top: 16px;
  }
`;

const createSalt = () => {
  return new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err, buf) => {
          if (err) reject(err);
          resolve(buf.toString('base64'));
      });
  });
}

const createHashedPassword = ( plainPassword:string ) => {
  return new Promise(async (resolve, reject) => {
      const salt:any = await createSalt();
      crypto.pbkdf2(plainPassword, salt, 1000, 64, 'sha512', (err, key) => {
          if (err) reject(err);
          resolve({ password: key.toString('base64'), salt });
      });
  });
}

const LoginComponent: React.FC<LoginTypes> = ({ setIsTokenLive }) => {
  const dispatch = useDispatch();
  const idInput:any = useRef();
  const pwInput:any = useRef();
  const loginButtonClick = async() => {
    if(loginUserId.length <= 0) {
      alert("아이디를 입력하세요");
      idInput.current.focus();
    }
    else if(loginUserPw.length <= 0){
      alert("비밀번호를 입력하세요");
      pwInput.current.focus();
    }
    else {
      // createHashedPassword(loginUserPw).then(function(hasedObject) {
      //   console.log(hasedObject)
      //   // setLoginUserPw()
      // })
      const res = await axios.post('http://localhost:9090' + '/api/user/login', {
        loginUserData: {
          id: loginUserId,
          pw: loginUserPw
        }
      })
      if(res.data.loginFlag === true){
        dispatch(setUserData({ 
          seq: res.data.userInfo.seq,
          id: res.data.userInfo.id,
          nickname: res.data.userInfo.nickname,
          prfimg: res.data.userInfo.prfimg
        } as UserData));
        setIsTokenLive(res.data.loginFlag)
      }
      else{
        alert(res.data)
      }
    }
  };

  const [joinPageOpened, setJoinPageOpened] = useState(false);
  const [loginUserId, setLoginUserId] = useState("");
  const [loginUserPw, setLoginUserPw] = useState("");
  
  return (
    <>
      {joinPageOpened ? <Join setJoinPageOpened={setJoinPageOpened} /> : <></>}
      <LoginStyled setIsTokenLive={setIsTokenLive}>
        <Logo mainColor="var(--color-point)" subColor="#231815" />
        <Fieldset>
          <InputText
            type="text"
            placeHolder="아이디를 입력하세요."
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setLoginUserId(e.currentTarget.value)}}
            reference={idInput}
          />
          <InputText
            type="password"
            placeHolder="패스워드를 입력하세요."
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setLoginUserPw(e.currentTarget.value)}}
            reference={pwInput}
          />
          <Button onClick={loginButtonClick} desc="로그인" height="48px" color="#fff" backgroundColor="var(--color-point)" />
        </Fieldset>
        <Typo fontSize="14px" color="rgba(0,0,0,.5)" onClick={(e) => setJoinPageOpened(true)}>회원가입</Typo>
      </LoginStyled>
    </>
  )
};

LoginComponent.defaultProps = {};

export default LoginComponent;
