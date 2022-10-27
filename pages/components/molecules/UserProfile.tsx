import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import ImgComponent from "../atoms/Img";
import TypoComponent from "../atoms/Typo";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { UserData, setUserData } from "redux/slices/user";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";

interface UserProfileTypes extends styledInterface {
  username?: string;
  usermail?: string;
}

const UserProfileStyled = styled.div<UserProfileTypes>`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 16px;
`;

const UserInfoStyled = styled.div<UserProfileTypes>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  flex: 1 1;
`;

const UserProfileComponent: React.FC<UserProfileTypes> = ({}) => {
  const userData = useSelector<ReducerType, UserData[]>((state) => state.user);
  const getLastLoginPeriod = () => {
    let stDate = new Date(userData[0].lastLogin);
    let endDate = new Date();
    let btMs = endDate.getTime() - stDate.getTime();
    let btDay = classifyTimestamp(btMs);
    return btDay;
  };
  const classifyTimestamp = (ms: number) => {
    let returnString: string = "";
    const timeDiv: number[] = [1000, 60, 60, 24];

    // for(let i=0; i<timeDiv.length; i++) {
    //   if(ms / (1000 * 60 * 60 * 24)).toFixed();
    // }

    return returnString;
  };
  return (
    <UserProfileStyled>
      <ImgComponent src={userData[0].prfimg} objectFit="cover" />
      <UserInfoStyled>
        <TypoComponent fontSize="16px" fontWeight="semi-bold" textAlign="left">
          {userData[0].nickname}
        </TypoComponent>
        <TypoComponent
          fontSize="14px"
          fontWeight="medium"
          textAlign="left"
          color="var(--color-point)"
          marginTop="4px"
        >
          {userData[0].id}
        </TypoComponent>
        <TypoComponent
          fontSize="12px"
          fontWeight="light"
          color="var(--color-lightgrey)"
          textAlign="left"
          marginTop="4px"
        >
          {`마지막 로그인: ${getLastLoginPeriod()}`}
        </TypoComponent>
      </UserInfoStyled>
      <Icon
        iconShape={faChevronRight}
        iconWidth="16px"
        iconHeight="16px"
        svgSize="12px"
      />
    </UserProfileStyled>
  );
};

UserProfileComponent.defaultProps = {};

export default UserProfileComponent;
