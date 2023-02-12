import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";

import ImgComponent from "pages/components/atoms/Img";
import TypoComponent from "pages/components/atoms/Typo";
import ProfileListComponent from "pages/components/molecules/SettingProfileList";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import ButtonCompontent from "pages/components/atoms/Button";
import ButtonWrapComponent from "pages/components/molecules/ButtonWrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Icon from "pages/components/atoms/Icon";
import uuid from "uuid4";
import UsageComponent from "pages/components/molecules/Usage";
import { regexUserName } from "pages/components/templates/Join";
import { newAlert } from "pages/components/atoms/Alert";
import axios from "axios";
import { reloadSession } from "pages/components/atoms/Session";

interface SettingProfileTypes extends styledInterface {}

const SettingProfileWrap = styled.div`
  background-color: var(--color-white);
  border-radius: 16px;
  padding: 16px 16px 40px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const SettingProfileUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const ProfileListWrap = styled.div`
  margin-bottom: 24px;
`;

const ChangeImgButtons = styled.div``;

const SettingProfileComponent: React.FC<SettingProfileTypes> = () => {
  const { data: session, status } = useSession();

  const [isNameValid, setIsNameValid] = useState(false);
  const [modUserName, setModUserName] = useState(session?.user.name!);
  const [userImg, setUserImg] = useState(session?.user.image!);

  const router = useRouter();
  const cancelBtnClick = () => {
    router.back();
  };

  const sendModForm = async () => {
    const res = await axios.post("http://localhost:3000" + "/api/user/mod", {
      modUserData: {
        name: modUserName,
        prfImg: userImg,
      },
    });

    res.data.affectedRows === 1
      ? (() => {
          router.back();
          newAlert("프로필 수정완료", "pstv");
          reloadSession();
        })()
      : (() => {
          console.log("프로필 수정 중 에러 발생:::", res.data);
        })();
  };
  const modBtnOnclick = () => {
    console.log("변경된 이미지: ", userImg);
    console.log("변경된 이름: ", modUserName);
    console.log("변경된 이름 중복체크 유효성: ", isNameValid);

    console.log("-----------------------------");
    if (!modUserName) {
      alert("닉네임을 입력해주세요.");
    } else if (!isNameValid) {
      if (modUserName === session?.user.name) {
        sendModForm();
      } else {
        alert("닉네임 중복체크를 완료해주세요.");
      }
    } else {
      sendModForm();
    }
  };

  return (
    <SettingProfileWrap>
      <SettingProfileUser>
        <ImgComponent
          src={userImg}
          objectFit="cover"
          marginBottom="16px"
          width="80px"
          height="80px"
        />
        {/* FIXME: 추후 버튼으로 바꾸어야할까요? */}
        <ChangeImgButtons>
          <TypoComponent
            fontSize="16px"
            fontWeight="semi-bold"
            textAlign="left"
            color="var(--color-point)"
            onClick={() => {
              setUserImg(
                `https://avatars.dicebear.com/api/personas/${uuid()}.svg`
              );
            }}
          >
            랜덤 아바타 생성
          </TypoComponent>
        </ChangeImgButtons>
      </SettingProfileUser>

      <ProfileListWrap>
        <ProfileListComponent
          typo="이메일"
          userInfo={`${session?.user.email}`}
          readonly={true}
          isEmail={true}
        />
        <ProfileListComponent
          typo="닉네임"
          userInfo={modUserName}
          maxLength={5}
          readonly={isNameValid}
          buttonInfo={{
            label: isNameValid ? "사용가능" : "중복체크",
            onClick: async () => {
              if (modUserName.length === 0) {
                newAlert("닉네임을 입력하세요.", "ngtv");
                return;
              }
              const res = await axios.get(
                "http://localhost:3000" + "/api/cert/name/dup",
                {
                  params: { userName: modUserName },
                }
              );
              res.data.length === 0
                ? (() => {
                    newAlert("사용 가능한 닉네임 입니다.", "pstv");
                    setIsNameValid(true);
                  })()
                : (() => {
                    newAlert("이미 사용중인 닉네임 입니다.", "ngtv");
                    console.log("닉네임 중복체크 에러 발생:::", res.data);
                  })();
            },
          }}
          onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.currentTarget.value.length > 0 &&
            regexUserName.test(e.currentTarget.value)
              ? (() => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    regexUserName,
                    ""
                  );
                  newAlert(
                    "한글, 영 대소문자, 숫자만 입력 가능합니다.",
                    "ngtv"
                  );
                })()
              : (() => {
                  e.currentTarget.value.length > 5
                    ? newAlert("최대 5글자까지 입력 가능합니다.", "ngtv")
                    : void 0;
                  setModUserName(e.currentTarget.value);
                })();
          }}
        />
        {/* <ProfileListComponent typo="소개글" /> */}
      </ProfileListWrap>

      <UsageComponent
        usageList={[
          "랜덤 아바타 버튼을 눌러서 무작위 캐릭터 이미지를 생성합니다.",
          "정보 변경 후 수정 버튼을 눌러 저장 완료합니다.",
          "저장되지 않은 변경정보는 모두 사라집니다.",
        ]}
      />

      <ButtonWrapComponent>
        <ButtonCompontent desc="취소" height="40px" onClick={cancelBtnClick} />
        <ButtonCompontent
          desc="수정"
          backgroundColor="var(--color-point)"
          color="var(--color-white)"
          height="40px"
          onClick={modBtnOnclick}
        />
      </ButtonWrapComponent>
    </SettingProfileWrap>
  );
};

export default SettingProfileComponent;
