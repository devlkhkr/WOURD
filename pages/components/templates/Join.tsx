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
import Timer from "../atoms/Timer";
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
  input{
    flex: 1;
  }
  > * + * {
    margin-left: 8px;
  }
`

const AuthCheckWrap = styled.div`
  position: relative;
  flex: 1;
  input{
    padding-right: 64px;
  }
  .auth_time_limit{
    position: absolute;
    right: 16px;
    top: 0;
  }
`

const JoinStyled = styled.div<LoginTypes>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 19999;
  padding: 16px;
  background-color: #f3f3f3;
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
      
    }
    else{
      setAuthCheckFlag(true)
    }
  }

  const authCodeCheck = () => {
    
  }

  return (
    <>
      <JoinStyled setJoinPageOpened={setJoinPageOpened}>
        <Form>
          <Typo fontSize="18px" fontWeight="semi-bold" marginTop="12px">회원가입</Typo>
          <Fieldset>
            <InputWrap>
              <Label
                htmlFor="joinId"
                desc="이메일"
                mandatory={true}
              />
              <FlexWrap>
                <InputText type="text" width="auto" placeHolder="예) user@copub.com" id="joinId" />
                <Button desc="코드전송" width="80px" backgroundColor="var(--color-point)" className={`${authCheckFlag ? "disabled" : ""}`} color="#fff" onClick={authButtonClick} disabled={authCheckFlag}/>
              </FlexWrap>
            </InputWrap>
            {authCheckFlag ? (
            <InputWrap>
              <FlexWrap>
                <AuthCheckWrap>
                  <InputText type="text" placeHolder="인증코드를 입력하세요." id="joinAuth" reference={authInput}/>
                  <Typo lineHeight="40px" color="#e51937" className="auth_time_limit"><Timer mm="10" ss="10" onExpire={authTimeEnd}/></Typo>
                </AuthCheckWrap>
                <Button desc="인증하기" width="80px" backgroundColor="var(--color-point)" color="#fff" onClick={authCodeCheck} />
              </FlexWrap>
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
        </Form>
      </JoinStyled>
    </>
  )
};

JoinComponent.defaultProps = {};

export default JoinComponent;
