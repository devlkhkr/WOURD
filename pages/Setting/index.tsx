import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import ImgComponent from "../components/atoms/Img";
import SettingListComponent from "../components/molecules/SettingList";

interface SettingTypes {
  typo: string;
  nextStep?: boolean;
  rightText?: string;
}

const SettingWrap = styled.div`
  background-color: var(--color-white);
  border-radius: 16px;
  padding: 16px 16px 80px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// user profile
const SettingProfileStyled = styled.div`
  display: flex;
  align-items: center;
  height: 88px;
  padding: 0 8px;
`;

// user interface
const SettingTopStyled = styled.div`
  margin-bottom: 2rem;
`;

// app interface
const SettingBottomStyled = styled.div``;

const Setting: NextPage<SettingTypes> = () => {
  return (
    <SettingWrap>
      <SettingProfileStyled>
        <ImgComponent src="https://w.namu.la/s/819be1bb98456607507be41201b6418c2a713302c52c359f4f4ae579af6fa78db7ad4a01cf994092f5442b785fc554fcc1a0d119fc41d8ff7ef2003c066b8a4c96cd745de2155092a4a23e7d05a31e3051bc8c88bc28ea8f10212e6fe18132e9" />
      </SettingProfileStyled>
      <SettingTopStyled>
        <SettingListComponent typo="비밀번호 변경" nextStep={true} />
        <SettingListComponent typo="공지사항" nextStep={true} />
        <SettingListComponent typo="탈퇴요청" nextStep={true} />
      </SettingTopStyled>

      <SettingBottomStyled>
        <SettingListComponent typo="도움말(FAQ)" nextStep={true} />
        <SettingListComponent typo="로그아웃" nextStep={true} />
        <SettingListComponent
          typo="버전정보"
          rightText="1.0.0"
        />
      </SettingBottomStyled>
    </SettingWrap>
  );
};

export default Setting;
