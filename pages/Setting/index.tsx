import type { NextPage } from "next";
import styled from "styled-components";
import SettingListComponent from "../components/molecules/SettingList";

interface SettingTypes {
  typo: String;
}

// user interface
const SettingUserStyled = styled.div`
  
`

// app interface
const SettingBottomStyled = styled.div`
  
`;

const Setting: NextPage<SettingTypes> = () => {
  return (
    <>
      <div>유저상단영역</div>
      <SettingUserStyled>
        <SettingListComponent typo="비밀번호 변경" />
      </SettingUserStyled>
      
      <SettingBottomStyled>
        <SettingListComponent typo="도움말" />
      </SettingBottomStyled>
    </>
  );
};

export default Setting;
