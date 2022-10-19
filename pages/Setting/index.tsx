import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import SettingListComponent from "../components/molecules/SettingList";

interface SettingTypes {
  typo: string;
  nextStep?: boolean;
  rightText?: string;
}

const SettingWrap = styled.div`
  background-color : var(--color-white);
  border-radius : 16px;
  padding : 16px 16px 80px;
  display : flex;
  flex-direction : column;
  height : 100%;
`

// user interface
const SettingUserStyled = styled.div`
  margin-bottom : 2rem;
`;

// app interface
const SettingBottomStyled = styled.div``;

const Setting: NextPage<SettingTypes> = () => {
  return (
    <SettingWrap>
      <div>유저프로필영역</div>
      <SettingUserStyled>
        <SettingListComponent 
          typo="비밀번호 변경"
          nextStep={true}
        />
        <SettingListComponent 
          typo="공지사항"
          nextStep={true}
        />
        <SettingListComponent 
          typo="탈퇴요청"
          nextStep={true}
        />
      </SettingUserStyled>

      <SettingBottomStyled>
        <SettingListComponent 
          typo="도움말(FAQ)"
          nextStep={true}
        />
        <SettingListComponent 
          typo="로그아웃"
          nextStep={true}
        />
        <SettingListComponent 
          typo="버전정보" 
          rightText="1.0.0"
        />
      </SettingBottomStyled>
    </SettingWrap>
  );
};

export default Setting;
