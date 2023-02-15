import styled from "styled-components";
import styledInterface from "../../functional/intefaces/styledComponent";

import ImgComponent from "pages/components/atoms/Img";
import TypoComponent from "pages/components/atoms/Typo";
import ProfileListComponent from "pages/components/molecules/SettingProfileList";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import ButtonCompontent from "pages/components/atoms/Button";
import ButtonWrapComponent from "pages/components/molecules/ButtonWrap";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Icon from "pages/components/atoms/Icon";
import uuid from "uuid4";
import UsageComponent from "pages/components/molecules/Usage";
import { regexUserName } from "pages/components/templates/Join";
import { newAlert } from "pages/components/atoms/Alert";
import axios from "axios";
import { reloadSession } from "functional/functions/Session";
import Mask from "pages/components/atoms/Mask";
import { useDidMountEffect } from "functional/customHooks/useDidMountEffect";
import { NextSeo } from "next-seo";

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

const SelectAvatarType = styled.div`
  width: 24px;
  height: 24px;
  background-color: #f3f3f3;
  display: inline-block;
  border-radius: 100%;
`;

const ChangeImgButtons = styled.div`
  > div {
    vertical-align: middle;
    & + div {
      margin-left: 8px;
    }
  }
  ul {
  }
`;

const SliderAvataTypes = styled.ul`
  white-space: nowrap;
  overflow: auto;
  width: calc(100% - 72px);
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.05);
  padding: 24px;
  z-index: 19999;
  position: absolute;
  left: 36px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px dashed #ddd;
  li {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: #f3f3f3;
    overflow: hidden;
    &.on {
      outline: 2px solid var(--color-point);
      img {
        opacity: 0.5;
      }
    }
    & + li {
      margin-left: 16px;
    }
  }
`;

const SettingProfileComponent: React.FC<SettingProfileTypes> = () => {
  const { data: session, status } = useSession();

  const [isNameValid, setIsNameValid] = useState(false);
  const [modUserName, setModUserName] = useState(
    session ? session?.user?.name! : ""
  );
  const [userImg, setUserImg] = useState(session ? session?.user?.image! : "");
  const [avtTypesOpened, setAvtTypesOpened] = useState(false);
  const [arrAvatarTypes, setArrAvatarTypes] = useState([
    "adventurer",
    "adventurer-neutral",
    "avataaars",
    "avataaars-neutral",
    "big-ears",
    "big-ears-neutral",
    "big-smile",
    "bottts",
    "bottts-neutral",
    "croodles",
    "croodles-neutral",
    "fun-emoji",
    "identicon",
    "lorelei",
    "lorelei-neutral",
    "micah",
    "miniavs",
    "open-peeps",
    "personas",
    "pixel-art",
    "pixel-art-neutral",
    "shapes",
    "thumbs",
  ]);

  const setSortedArrAvatarTypes = (current: string) => {
    let tempArrAvatarTypes = [...arrAvatarTypes];
    let sortedArrAvatarTypes = tempArrAvatarTypes
      .filter((x) => x === current)
      .concat(tempArrAvatarTypes.filter((x) => x !== current));
    setArrAvatarTypes(sortedArrAvatarTypes);
  };

  const getUserAvatarType = () => {
    if (session) {
      let userAvatarType = session?.user?.image
        ?.split("5.x")[1]
        .split("svg")[0]
        .replaceAll("/", "");
      return arrAvatarTypes[arrAvatarTypes.indexOf(userAvatarType!)];
    }
  };

  const [avatarType, setAvatarType] = useState(getUserAvatarType());

  useEffect(() => {
    setSortedArrAvatarTypes(avatarType!);
  }, []);

  useDidMountEffect((): void => {
    setUserImg(`https://api.dicebear.com/5.x/${avatarType}/svg?seed=${uuid()}`);
  }, [avatarType]);

  const router = useRouter();

  const cancelBtnClick = () => {
    router.back();
  };

  const sendModForm = async () => {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_ORIGIN + "/api/user/mod",
      {
        modUserData: {
          name: modUserName,
          prfImg: userImg,
        },
      }
    );

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

    if (session) {
      if (!modUserName) {
        alert("닉네임을 입력해주세요.");
      } else if (!isNameValid) {
        if (modUserName === session?.user?.name!) {
          sendModForm();
        } else {
          alert("닉네임 중복체크를 완료해주세요.");
        }
      } else {
        sendModForm();
      }
    } else {
      alert("세션만료");
    }
  };

  return (
    <>
      <NextSeo
        title="Wourd Setting Profile"
        description="Wourd Setting Profile Page"
        openGraph={{
          type: "website",
          url: process.env.NEXT_PUBLIC_ORIGIN + "/Setting/Profile",
          title: "Wourd Setting Profile Page",
          description: "",
        }}
      />
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
            <SelectAvatarType>
              <ImgComponent
                src={`https://api.dicebear.com/5.x/${avatarType}/svg?seed=sample`}
                onClick={() => {
                  setAvtTypesOpened(true);
                }}
              />
              {avtTypesOpened ? (
                <>
                  <Mask
                    trnsp={true}
                    onClick={() => {
                      setAvtTypesOpened(false);
                    }}
                  />
                  <SliderAvataTypes>
                    {arrAvatarTypes.map((avatar: string, index: number) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setAvatarType(avatar);
                            setSortedArrAvatarTypes(avatar);
                            setAvtTypesOpened(false);
                          }}
                          className={avatarType === avatar ? "on" : ""}
                        >
                          <ImgComponent
                            src={`https://api.dicebear.com/5.x/${avatar}/svg?seed=sample`}
                          />
                        </li>
                      );
                    })}
                  </SliderAvataTypes>
                </>
              ) : (
                <></>
              )}
            </SelectAvatarType>
            <TypoComponent
              display="inline-block"
              fontSize="16px"
              fontWeight="semi-bold"
              textAlign="left"
              color="var(--color-point)"
              onClick={() => {
                setUserImg(
                  `https://api.dicebear.com/5.x/${avatarType}/svg?seed=${uuid()}`
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
            userInfo={`${session ? session?.user?.email! : ""}`}
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
                  process.env.NEXT_PUBLIC_ORIGIN + "/api/cert/name/dup",
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
          <ButtonCompontent
            desc="취소"
            height="40px"
            color="var(--color-black)"
            onClick={cancelBtnClick}
          />
          <ButtonCompontent
            desc="수정"
            backgroundColor="var(--color-point)"
            color="var(--color-white)"
            height="40px"
            onClick={modBtnOnclick}
          />
        </ButtonWrapComponent>
      </SettingProfileWrap>
    </>
  );
};

export default SettingProfileComponent;
