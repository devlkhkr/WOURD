import React from "react";
import styled from "styled-components";
import Logo from "../../components/atoms/Logo";
import InputText from "../../components/atoms/InputText";
import Typo from "../../components/atoms/Typo";
import Button from "../../components/atoms/Button";
import Fieldset from "../../components/molecules/Fieldset";
import Form from "../../components/organisms/Form";
import Join from "../../components/templates/Join"
import { useState } from "react";

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

const LoginComponent: React.FC<LoginTypes> = ({ setIsTokenLive }) => {
  const loginButtonClick = () => {
    setIsTokenLive(true)
  };
  const [joinPageOpened, setJoinPageOpened] = useState(false);
  return (
    <>
      {joinPageOpened ? <Join setJoinPageOpened={setJoinPageOpened} /> : <></>}
      <LoginStyled setIsTokenLive={setIsTokenLive}>
        <Logo mainColor="var(--color-point)" subColor="#231815" />
        <Fieldset>
          <InputText
            type="text"
            placeHolder="아이디를 입력하세요."
          />
          <InputText
            type="password"
            placeHolder="패스워드를 입력하세요."
          />
          <Button onClick={loginButtonClick} desc="로그인" height="48px" color="#fff" backgroundColor="var(--color-point)" title="로그인 버튼"/>
        </Fieldset>
        <Typo size="14px" color="rgba(0,0,0,.5)" onClick={(e) => setJoinPageOpened(true)}>회원가입</Typo>
      </LoginStyled>
    </>
  )
};

LoginComponent.defaultProps = {};

export default LoginComponent;
