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
import validator from "validator";
import passwordValidator from "password-validator";
import Hash from "../atoms/Hash";
interface JoinTypes {
  setJoinPageOpened: Function;
  signIn: Function;
  insertLoginData: Function;
}

interface HashedDataTypes {
  password: string;
  salt: string;
}

const FlexWrap = styled.div`
  display: flex;
  button.disabled {
    background-color: var(--color-grey);
  }
  input {
    flex: 1;
  }
  > * + * {
    margin-left: 8px;
  }
`;

const AuthCheckWrap = styled.div`
  position: relative;
  flex: 1;
  input {
    padding-right: 64px;
  }
  .auth_time_limit {
    position: absolute;
    right: 16px;
    top: 0;
  }
`;

const JoinStyled = styled.div<JoinTypes>`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 720px;
  min-width: 360px;
  width: 100%;
  height: 100%;
  z-index: 19999;
  padding: 16px;
  background-color: #f3f3f3;
  overflow-y: auto;
  animation: popup 0.3s linear;
`;

const JoinComponent: React.FC<JoinTypes> = ({
  setJoinPageOpened,
  signIn,
  insertLoginData,
}) => {
  /* S : DOM Element 동작 State Flag */
  const [authCheckFlag, setAuthCheckFlag] = useState(false); //인증 시작 플래그
  const [stopTimer, setStopTimer] = useState(false); //인증성공시 타이머 종료 플래그
  /* E : DOM Element 동작 State Flag */

  /* S : 인증코드 State */
  const [resAuthCode, setResAuthCode] = useState(""); //서버에서 전달받은 인증코드
  const [joinUserAuthCode, setJoinUserAuthCode] = useState(""); //사용자가 입력한 authCode
  /* E : 인증코드 State */

  /* S : 유효성 체크 State Flags */
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPwCfValid, setIsPwCfValid] = useState(false);
  const [isInvtValid, setIsInvtValid] = useState(false);
  /* E : 유효성 체크 State Flags */

  /* S : 서버로 보낼 데이터 State */
  const [joinUserId, setJoinUserId] = useState(""); //사용자가 입력한 id 이메일
  const [joinUserPw, setJoinUserPw] = useState(""); //사용자가 입력한 pw
  const [joinUserName, setJoinUserName] = useState(""); //사용자가 입력한 이름
  const [joinUserImg, setJoinUserImg] = useState("");
  /* E : 서버로 보낼 데이터 State */

  const pwInput: any = useRef();
  const pwCfInput: any = useRef();

  const invtCode: any = process.env.NEXT_PUBLIC_INVITE_CODE;

  const schema = new passwordValidator();
  schema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces();

  const authTimeEnd = function () {
    setAuthCheckFlag(false);
  };

  const emailDupCheck = async () => {
    const res = await axios.post("http://localhost:3000" + "/api/join/dup", {
      joinUserData: {
        email: joinUserId,
      },
    });
    return res.data.length;
  };

  const authButtonClick = () => {
    emailDupCheck().then((dupCheckLeng: number) => {
      if (dupCheckLeng === 0) {
        if (authCheckFlag) {
        } else if (joinUserId.length === 0) {
          alert("이메일을 입력해주세요.");
        } else if (!validator.isEmail(joinUserId)) {
          alert("유효한 이메일 형식이 아닙니다.");
        } else {
          sendAuthCheckMail();
          setAuthCheckFlag(true);
        }
      } else if (dupCheckLeng > 0) {
        alert("이미 등록된 이메일 입니다.");
      } else {
        console.log("예외오류:::::", dupCheckLeng);
      }
    });
  };

  const sendAuthCheckMail = async () => {
    const res = await axios.post(
      "http://localhost:3000" + "/api/join/sendmail",
      {
        joinUserData: {
          email: joinUserId,
        },
      }
    );

    setResAuthCode(res.data.authCode);
  };

  const successAuthCheck = () => {
    setStopTimer(true);
    alert("인증에 성공했습니다.");
    setIsEmailValid(true);
  };

  const authCodeCheck = () => {
    console.log(joinUserAuthCode, resAuthCode);
    joinUserAuthCode === resAuthCode
      ? successAuthCheck()
      : alert("인증코드가 일치하지 않습니다.");
  };

  const validatePw = (pw: string) => {
    setIsPwValid(false); // 입력시 암호가 변경되었으므로 state false
    setJoinUserPw(pw);

    if (pwCfInput.current.value.length > 0) {
      validatePwConfirm();
    }
    if (pw.length === 0) {
      pwInput.current.removeAttribute("data-valid-state");
    } else {
      schema.validate(pw)
        ? (() => {
            pwInput.current.setAttribute("data-valid-state", "valid");
            setIsPwValid(true);
          })()
        : (() => {
            pwInput.current.setAttribute("data-valid-state", "err");
          })();
    }
  };

  const validatePwConfirm = () => {
    if (pwCfInput.current.value.length === 0) {
      pwCfInput.current.removeAttribute("data-valid-state");
    } else if (pwCfInput.current.value === pwInput.current.value) {
      pwCfInput.current.setAttribute("data-valid-state", "valid");
      setIsPwCfValid(true);
    } else {
      pwCfInput.current.setAttribute("data-valid-state", "err");
      setIsPwCfValid(false);
    }
  };

  const validInvtCode = (invt: HTMLInputElement) => {
    if (invt.value.length === 0) {
      invt.removeAttribute("data-valid-state");
    } else {
      invt.value === invtCode
        ? (() => {
            invt.setAttribute("data-valid-state", "valid");
            setIsInvtValid(true);
          })()
        : (() => {
            invt.setAttribute("data-valid-state", "err");
            setIsInvtValid(false);
          })();
    }
  };

  const joinButtonClick = () => {
    console.log("작성된 이메일: ", joinUserId);
    console.log("작성된 암호: ", joinUserPw);
    console.log("작성된 이름: ", joinUserName);

    console.log("mail 유효성: ", isEmailValid);
    console.log("pw 유효성: ", isPwValid);
    console.log("invt 유효성: ", isInvtValid);

    console.log("-----------------------------");
    if (!isEmailValid) {
      alert("이메일 인증을 완료해주세요.");
    } else if (!isPwValid) {
      alert("비밀번호 양식을 확인해주세요.");
    } else if (!isPwCfValid) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (joinUserName.length <= 0) {
      alert("닉네임을 입력해주세요.");
    } else if (!isInvtValid) {
      alert("초대코드가 유효하지 않습니다.");
    } else {
      Hash.createHashedPassword(joinUserPw).then(
        (hashedData: HashedDataTypes) => {
          console.log(hashedData);
          sendJoinForm(hashedData.password, hashedData.salt);
        }
      );
    }
  };

  const sendJoinForm = async (hashedPw: string, salt: string) => {
    const res = await axios.post("http://localhost:3000" + "/api/join/reg", {
      joinUserData: {
        email: joinUserId,
        pw: hashedPw,
        name: joinUserName,
        salt: salt,
        prfImg: joinUserImg,
      },
    });

    res.data.affectedRows === 1
      ? (() => {
          insertLoginData(joinUserId);
          confirm("회원가입이 완료되었습니다.\n즉시 로그인하시겠습니까?")
            ? (async () => {
                let loginUserId = joinUserId;
                const res = await signIn("credentials", {
                  loginUserId,
                  hashedPw,
                  redirect: false,
                });
                if (res.error != null) {
                  console.log("error:::", res.error);
                }
              })()
            : void 0;
          setJoinPageOpened(false);
        })()
      : (() => {
          console.log("에러 발생:::::", res.data);
        })();
  };

  return (
    <>
      <JoinStyled
        setJoinPageOpened={setJoinPageOpened}
        signIn={signIn}
        insertLoginData={insertLoginData}
      >
        <Form>
          <Typo fontSize="18px" fontWeight="semi-bold" marginTop="12px">
            회원가입
          </Typo>
          <Fieldset>
            <InputWrap>
              <Label htmlFor="joinId" desc="이메일" mandatory={true} />
              <FlexWrap>
                <InputText
                  type="text"
                  width="auto"
                  placeHolder="예) user@cidict.co.kr"
                  id="joinId"
                  readonly={authCheckFlag}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setJoinUserId(e.currentTarget.value);
                  }}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setJoinUserAuthCode(e.currentTarget.value);
                      }}
                    />
                    <Typo
                      lineHeight="40px"
                      color="#e51937"
                      className="auth_time_limit"
                    >
                      <Timer
                        mm="10"
                        ss="00"
                        onExpire={authTimeEnd}
                        stopTimer={stopTimer}
                      />
                    </Typo>
                  </AuthCheckWrap>
                  <Button
                    desc="인증하기"
                    width="80px"
                    backgroundColor="var(--color-point)"
                    color="#fff"
                    onClick={authCodeCheck}
                  />
                </FlexWrap>
              </InputWrap>
            ) : (
              <></>
            )}
          </Fieldset>
          <Fieldset>
            <InputWrap>
              <Label htmlFor="joinPw" desc="비밀번호" mandatory={true} />
              <InputText
                type="password"
                placeHolder="8자리 이상, 영어대문자 + 소문자 포함"
                id="joinPw"
                reference={pwInput}
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => {
                  validatePw(e.currentTarget.value);
                }}
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
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => {
                  validatePwConfirm();
                }}
              />
            </InputWrap>
          </Fieldset>

          <Fieldset>
            <InputWrap>
              <Label htmlFor="joinName" desc="닉네임" mandatory={true} />
              <InputText
                type="text"
                placeHolder="닉네임을 입력하세요."
                id="joinName"
                maxLength={5}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setJoinUserName(e.currentTarget.value);
                  setJoinUserImg(
                    `https://avatars.dicebear.com/api/personas/${e.currentTarget.value}.svg`
                  );
                }}
              />
            </InputWrap>
            <InputWrap>
              <Label htmlFor="joinKey" desc="초대코드" mandatory={true} />
              <InputText
                type="text"
                placeHolder="초대코드를 입력하세요."
                id="joinKey"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  validInvtCode(e.currentTarget);
                }}
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
                onClick={() => {
                  joinButtonClick();
                }}
              />
            </ButtonWrap>
          </Fieldset>
        </Form>
      </JoinStyled>
    </>
  );
};

JoinComponent.defaultProps = {};

export default JoinComponent;
