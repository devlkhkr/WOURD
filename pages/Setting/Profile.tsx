import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";

import ImgComponent from "pages/components/atoms/Img";
import TypoComponent from "pages/components/atoms/Typo";
import ProfileListComponent from "pages/components/molecules/SettingProfileList";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { UserDataTypes } from "redux/slices/user";
import ButtonCompontent from "pages/components/atoms/Button";
import ButtonWrapComponent from "pages/components/molecules/ButtonWrap";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";

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

const ProfileListWrap = styled.div``;

const ChangeImgButtons = styled.div``;

const SettingProfileComponent: React.FC<SettingProfileTypes> = () => {
  const { data: session, status } = useSession();

  const [wordActivity, setWordActivity] = useState(false);

  const router = useRouter();
  const cancelBtnClick = () => {
    router.back();
  };

  // FIXME: 이미지 수정할수있는 함수
  const modifyImg = () => {
    console.log("이미지 수정 함수");
  };

  return (
    <SettingProfileWrap>
      <SettingProfileUser>
        <ImgComponent
          src={session?.user.image!}
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
            onClick={modifyImg}
          >
            프로필 사진 바꾸기
          </TypoComponent>
        </ChangeImgButtons>
      </SettingProfileUser>

      <ProfileListWrap>
        <ProfileListComponent
          typo="이메일"
          userInfo={`${session?.user.email}`}
        />
        <ProfileListComponent
          typo="닉네임"
          userInfo={`${session?.user.name}`}
        />
        {/* <ProfileListComponent typo="소개글" /> */}
      </ProfileListWrap>

      <ButtonWrapComponent>
        <ButtonCompontent desc="취소" height="40px" onClick={cancelBtnClick} />
        <ButtonCompontent
          desc="수정"
          backgroundColor="var(--color-point)"
          color="var(--color-white)"
          height="40px"
        />
      </ButtonWrapComponent>
    </SettingProfileWrap>
  );
};

export default SettingProfileComponent;
