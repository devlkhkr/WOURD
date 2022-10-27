import type { NextPage } from "next";
import ToggleCheckComponent from "pages/components/atoms/Toggle";
import { useState } from "react";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";
import SettingListComponent from "../components/molecules/SettingList";
import UserProfileComponent from "../components/molecules/UserProfile";
import Accordion from "../components/molecules/Accordion";

interface SettingTypes extends styledInterface {
  typo: string;
  afterIcon?: string;
  rightTypo?: string;
}

interface AcrdListTypes {
  acrdTitle: string;
  toggleFlag: boolean;
  toggleFunc: Function;
  acrdList: {
    label: string;
    checked: boolean;
  }[];
}

const SettingWrap = styled.div`
  background-color: var(--color-white);
  border-radius: 16px;
  padding: 16px 16px 40px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

// user profile
const SettingProfileStyled = styled.div`
  display: flex;
  align-items: center;
  /* height: 88px; */
  padding: 0 8px;
`;

// user interface
const SettingTopStyled = styled.div`
  margin-bottom: 32px;
`;

// app interface
const SettingBottomStyled = styled.div``;

const Setting: NextPage<SettingTypes> = () => {
  const [wordCtrlByState, setWordCtrlByState] = useState(false);
  const [wordCtrlByCate, setWordCtrlByCate] = useState(false);

  const objAcrdList: AcrdListTypes[] = [
    {
      acrdTitle: "상태별 노출 관리",
      toggleFlag: wordCtrlByState,
      toggleFunc: setWordCtrlByState,
      acrdList: [
        {
          label: "아는단어",
          checked: false,
        },
        {
          label: "모르는단어",
          checked: true,
        },
        {
          label: "즐겨찾은단어",
          checked: true,
        },
        {
          label: "건너뛴단어",
          checked: false,
        },
      ],
    },
    {
      acrdTitle: "카테고리별 노출 관리",
      toggleFlag: wordCtrlByCate,
      toggleFunc: setWordCtrlByCate,
      acrdList: [
        {
          label: "CS",
          checked: false,
        },
        {
          label: "FrontEnd",
          checked: true,
        },
        {
          label: "BackEnd",
          checked: true,
        },
        {
          label: "App",
          checked: false,
        },
      ],
    },
  ];

  return (
    <SettingWrap>
      <SettingProfileStyled>
        <UserProfileComponent />
      </SettingProfileStyled>

      <SettingTopStyled>
        {objAcrdList.map((item) => (
          <>
            <SettingListComponent
              typo={item.acrdTitle}
              afterIcon={item.toggleFlag ? "arr-up" : "arr-down"}
              onClick={() => {
                item.toggleFunc((prev: boolean) => !prev);
              }}
            />

            <Accordion isOpened={item.toggleFlag}>
              <ToggleCheckComponent typo="아는단어" defaultChecked={false} />
              <ToggleCheckComponent typo="모르는단어" defaultChecked={true} />
              <ToggleCheckComponent typo="즐겨찾은단어" defaultChecked={true} />
              <ToggleCheckComponent typo="건너뛴단어" defaultChecked={false} />
            </Accordion>
          </>
        ))}
      </SettingTopStyled>

      <SettingBottomStyled>
        <SettingListComponent typo="공지사항" />
        <SettingListComponent typo="도움말(FAQ)" />
        <SettingListComponent typo="개발히스토리" />
        <SettingListComponent typo="시스템스펙" />
        <SettingListComponent typo="버전정보" rightTypo="1.0.0" />
        <SettingListComponent typo="로그아웃" color="var(--color-red)" />
      </SettingBottomStyled>
    </SettingWrap>
  );
};

export default Setting;
