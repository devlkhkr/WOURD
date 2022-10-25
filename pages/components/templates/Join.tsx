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

import axios from "axios";
import validator from "validator"
import passwordValidator from "password-validator";
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
  animation: popup .3s linear;
`;

const JoinComponent: React.FC<LoginTypes> = ({ setJoinPageOpened }) => {
  const [authCheckFlag, setAuthCheckFlag] = useState(false); //인증 시작 플래그
  
  const [joinUserId, setJoinUserId] = useState(""); //사용자가 입력한 id 이메일
  const [joinUserAuthCode, setJoinUserAuthCode] = useState(""); //사용자가 입력한 authCode
  const [resAuthCode, setResAuthCode] = useState(""); //서버에서 전달받은 인증코드
  
  const [stopTimer, setStopTimer] = useState(false); //인증성공시 타이머 종료 플래그
  
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isInvtValid, setIsInvtValid] = useState(false);

  const pwInput:any = useRef();
  const pwCfInput:any = useRef();
  const invtCode:string = "test"

  const schema = new passwordValidator();
  schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces()

  const authTimeEnd = function () {
    setAuthCheckFlag(false);
  }

  const authButtonClick = () => {
    if(authCheckFlag){
      
    }
    else if(!validator.isEmail(joinUserId)){
      alert("유효한 이메일 형식이 아닙니다.")
    }
    else{
      sendAuthCheckMail();
      setAuthCheckFlag(true)
    }
  }

  const sendAuthCheckMail = async() => {
    const res = await axios.post('http://localhost:9090' + '/api/join/sendmail', {
      joinUserData: {
        email: joinUserId,
      }
    })
    
    setResAuthCode(res.data.authCode)

  }

  const successAuthCheck = () => {
    setStopTimer(true)
    alert("인증에 성공했습니다.")
    setIsEmailValid(true);
  }

  const authCodeCheck = () => {
    joinUserAuthCode === resAuthCode ? successAuthCheck() : alert("인증코드가 일치하지 않습니다.");
  }

  const validatePw = (pw:string) => {
    if(pwCfInput.current.value.length > 0){
      validatePwConfirm();
    }
    if(pw.length === 0){
      pwInput.current.removeAttribute("data-valid-state");
    }else{
      schema.validate(pw) ? (() => {
        pwInput.current.setAttribute("data-valid-state", "valid");
        setIsPwValid(true);
      })() : (() => {
        pwInput.current.setAttribute("data-valid-state", "err");
        setIsPwValid(false);
      })();
    }
  }

  const validatePwConfirm = () => {
    if(pwCfInput.current.value.length === 0){
      pwCfInput.current.removeAttribute("data-valid-state");
    }
    else if(pwCfInput.current.value === pwInput.current.value){
      pwCfInput.current.setAttribute("data-valid-state", "valid")
      setIsPwValid(true);
    }
    else{
      pwCfInput.current.setAttribute("data-valid-state", "err")
      setIsPwValid(false);
    }
  }

  const validInvtCode = (invt:HTMLInputElement) => {
    if(invt.value.length === 0){
      invt.removeAttribute("data-valid-state");
    }
    else{
      invt.value === invtCode ? (() => {
        invt.setAttribute("data-valid-state", "valid");
        setIsInvtValid(true);
      }) : (() => {
        invt.setAttribute("data-valid-state", "err");
        setIsInvtValid(false);
      })
    }
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
                <InputText
                  type="text"
                  width="auto"
                  placeHolder="예) user@cidict.com"
                  id="joinId"
                  readonly={authCheckFlag}
                  onChange={
                    (e:React.ChangeEvent<HTMLInputElement>) => {setJoinUserId(e.currentTarget.value)}
                  }
                />
                <Button
                  desc="코드전송"
                  width="80px"
                  backgroundColor="var(--color-point)"
                  className={`${authCheckFlag ? "disabled" : ""}`}
                  color="#fff"
                  onClick={authButtonClick}
                  disabled={authCheckFlag}
                />
              </FlexWrap>
            </InputWrap>
            {authCheckFlag ? (
            <InputWrap>
              <FlexWrap>
                <AuthCheckWrap>
                  <InputText
                    type="text"
                    placeHolder="인증코드를 입력하세요."
                    id="joinAuth"
                    readonly={isEmailValid}
                    onChange={
                      (e:React.ChangeEvent<HTMLInputElement>) => {setJoinUserAuthCode(e.currentTarget.value)}
                    }
                  />
                  <Typo lineHeight="40px" color="#e51937" className="auth_time_limit">
                    <Timer mm="10" ss="00" onExpire={authTimeEnd} stopTimer={stopTimer}/>
                  </Typo>
                </AuthCheckWrap>
                <Button desc="인증하기" width="80px" backgroundColor="var(--color-point)" color="#fff" onClick={authCodeCheck} />
              </FlexWrap>
            </InputWrap>
            ) : <></>}
          </Fieldset>
          <Fieldset>
            <InputWrap>
              <Label
                htmlFor="joinPw"
                desc="비밀번호"
                mandatory={true}
              />
              <InputText
                type="password"
                placeHolder="8자리 이상, 영어대문자 + 소문자 + 숫자 조합"
                id="joinPw"
                reference={pwInput}
                onKeyUp={
                  (e:React.ChangeEvent<HTMLInputElement>) => {validatePw(e.currentTarget.value)}
                }
              />
            </InputWrap>
            <InputWrap>
              <Label
                htmlFor="joinPwConfirm"
                desc="비밀번호 확인"
                mandatory={true}
              />
              <InputText
                type="password"
                placeHolder="비밀번호를 한번 더 입력하세요."
                id="joinPwConfirm"
                reference={pwCfInput}
                onKeyUp={
                  (e:React.ChangeEvent<HTMLInputElement>) => {validatePwConfirm()}
                }
              />
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
              <InputText
                type="text"
                placeHolder="초대코드를 입력하세요."
                id="joinKey"
                onChange={
                  (e:React.ChangeEvent<HTMLInputElement>) => {validInvtCode(e.currentTarget)}
                }
              />
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
