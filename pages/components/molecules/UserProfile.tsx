import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import ImgComponent from "../atoms/Img";
import TypoComponent from "../atoms/Typo";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { UserData } from "redux/slices/user";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";

interface UserProfileTypes extends styledInterface {
  username?: string;
  usermail?: string;
}

interface PeriodTypes {
  type: any;
  result: any;
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

  const getPeriodType = (microSec: number) => {
    const timeDiv: number[] = [1000, 60, 60, 24];
    let result: string = "";
    for (let type: number = timeDiv.length - 1; type > -1; type--) {
      let divValue: number = 1;
      for (let v = type; v > -1; v--) {
        divValue *= timeDiv[v];
      }
      result = (microSec / divValue).toFixed();
      // console.log(result);
      if (result != "0") {
        return { type, result };
      }
    }
  };

  const classifyTimestamp = (ms: number) => {
    let periodSuffix: string = "";

    let lastLoginPeriod: PeriodTypes = getPeriodType(ms)!;

    switch (lastLoginPeriod.type) {
      case 0:
        periodSuffix = "초";
        break;
      case 1:
        periodSuffix = "분";
        break;
      case 2:
        periodSuffix = "시간";
        break;
      case 3:
        periodSuffix = "일";
        break;
    }

    return `${lastLoginPeriod.result + periodSuffix} 전`;
  };
  return (
    <UserProfileStyled>
      <ImgComponent src={userData[0].prfImg} objectFit="cover" />
      <UserInfoStyled>
        <TypoComponent fontSize="16px" fontWeight="semi-bold" textAlign="left">
          {userData[0].nickName}
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
          marginTop="8px"
        >
          {`마지막 접속: ${getLastLoginPeriod()}`}
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
