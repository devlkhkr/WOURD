import React from "react";
import styled from "styled-components";
import Typo from "../atoms/Typo";
import InputText from "../atoms/InputText";
import Radio from "../atoms/Radio";
import Select from "../atoms/Select";
import MultiSelect from "../atoms/MultiSelect";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import Fieldset from "../molecules/Fieldset";
import InputWrap from "../molecules/InputWrap";
import ButtonWrap from "../molecules/ButtonWrap";
import Timer from "../molecules/Timer";
import Form from "../organisms/Form";

import { useState } from "react";
import { useRef } from "react";

interface LoginTypes {
  setJoinPageOpened: Function
}

const FlexWrap = styled.div`
  display: flex;
  button.disabled{
    background-color: var(--color-grey);
  }
  > * + * {
    margin-left: 8px;
  }
`

const AuthCheckWrap = styled.div`
  position: relative;
  input{
    padding-right: 64px;
  }
  .auth_time_limit{
    position: absolute;
    right: 16px;
    top: 0;
  }
`

const JoinStyled = styled.form<LoginTypes>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 19999;
  padding: 32px 16px;
  background-color: #fff;
  overflow-y: auto;
`;

const JoinComponent: React.FC<LoginTypes> = ({ setJoinPageOpened }) => {
  
  const [authCheckFlag, setAuthCheckFlag] = useState(false);
  const authInput:any = useRef()
  const authTimeEnd = function () {
    setAuthCheckFlag(false);
  }

  const authButtonClick = () => {
    if(authCheckFlag){
      alert("이미 전송되었습니다.")
    }
    else{
      setAuthCheckFlag(true)
    }
  }

  return (
    <>
      <JoinStyled setJoinPageOpened={setJoinPageOpened}>
          <Typo fontSize="18px" fontWeight="semi-bold" marginTop="12px">회원가입</Typo>
          <Fieldset>
            <InputWrap>
              <Label
                htmlFor="joinId"
                desc="아이디"
                mandatory={true}
              />
              <FlexWrap>
                <InputText type="text" placeHolder="아이디로 사용할 이메일을 입력하세요." id="joinId" />
                <Button desc="인증하기" width="160px" backgroundColor="var(--color-point)" className={`${authCheckFlag ? "disabled" : ""}`} color="#fff" onClick={authButtonClick}/>
              </FlexWrap>
            </InputWrap>
            {authCheckFlag ? (
              <InputWrap>
                <AuthCheckWrap>
                  <InputText type="text" placeHolder="이메일로 전송된 인증코드를 입력하세요." id="joinAuth" reference={authInput}/>
                  <Typo lineHeight="40px" color="#e51937" className="auth_time_limit"><Timer mm="00" ss="10" onExpire={authTimeEnd}/></Typo>
                </AuthCheckWrap>
              </InputWrap>
            ) : <></>}
            <InputWrap>
              <Label
                htmlFor="joinPw"
                desc="비밀번호"
                mandatory={true}
              />
              <InputText type="password" placeHolder="최소 8자리 이상, 영문자 + 숫자 조합" id="joinPw" />
            </InputWrap>
            <InputWrap>
              <Label
                htmlFor="joinPwConfirm"
                desc="비밀번호 확인"
                mandatory={true}
              />
              <InputText type="password" placeHolder="비밀번호를 한번 더 입력하세요." id="joinPwConfirm" />
            </InputWrap>
          </Fieldset>

          <Fieldset>
            <InputWrap>
              <Label
                htmlFor="joinName"
                desc="성함"
                mandatory={true}
              />
              <InputText type="text" placeHolder="실명을 입력하세요." id="joinName" />
            </InputWrap>
            <InputWrap>
              <Label
                htmlFor="joinKey"
                desc="초대코드"
                mandatory={true}
              />
              <InputText type="text" placeHolder="초대코드를 입력하세요." id="joinKey" />
            </InputWrap>
          </Fieldset>

          <Fieldset>
            <ButtonWrap>
              <Button
                desc="취소"
                id="cancleRegWord"
                backgroundColor="var(--color-grey)"
                color="#fff"
                width="40%"
                height="40px"
                onClick={() => setJoinPageOpened(false)}
              />
              <Button
                desc="가입"
                id="submitRegWord"
                backgroundColor="var(--color-point)"
                color="#fff"
                width="60%"
                height="40px"
              />
            </ButtonWrap>
          </Fieldset>
      </JoinStyled>
    </>
  )
};

JoinComponent.defaultProps = {};

export default JoinComponent;
