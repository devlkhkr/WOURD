import type { NextPage } from "next";
import ToggleCheckComponent from "pages/components/atoms/Toggle";
import { useState } from "react";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";
import SettingListComponent from "../components/molecules/SettingList";
import UserProfileComponent from "../components/molecules/UserProfile";

interface SettingTypes extends styledInterface {
  typo: string;
  afterIcon?: string;
  rightTypo?: string;
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
  margin-bottom: 32px;
`;

// app interface
const SettingBottomStyled = styled.div``;

const Setting: NextPage<SettingTypes> = () => {
  const [wordControl, setwordControl] = useState(false);
  
  console.log(wordControl)


  return (
    <SettingWrap>
      <SettingProfileStyled>
        <UserProfileComponent />
      </SettingProfileStyled>

      <SettingTopStyled>
        <SettingListComponent 
          typo="단어노출제어" 
          afterIcon="arr-down"
          onClick={() => {
            setwordControl(prev => !prev);
          }}
        />
        {/* 
          아는단어
          모르는단어
          즐겨찾는단어
          건너뛴단어
         */}
        {
          // 아코디언
          wordControl && (
            <>
              <ToggleCheckComponent 
                typo="아는단어만보기"
              />
              <ToggleCheckComponent 
                typo="모르는단어보기"
              />
            </>
          )
        }
      </SettingTopStyled>

      <SettingBottomStyled>
        <SettingListComponent typo="공지사항" />
        <SettingListComponent typo="도움말(FAQ)" />
        <SettingListComponent typo="개발히스토리" />
        <SettingListComponent typo="버전정보" rightTypo="1.0.0" />
        <SettingListComponent typo="시스템스펙" />
        <SettingListComponent typo="로그아웃" />
      </SettingBottomStyled>
    </SettingWrap>
  );
};

export default Setting;
