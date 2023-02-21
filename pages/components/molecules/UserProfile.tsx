import React from "react";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
import ImgComponent from "../atoms/Img";
import TypoComponent from "../atoms/Typo";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();

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

  function getTimeDiffString(milliseconds: number) {
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (milliseconds < minute) {
      return `${Math.floor(milliseconds / second)}초 전`;
    } else if (milliseconds < hour) {
      return `${Math.floor(milliseconds / minute)}분 전`;
    } else if (milliseconds < day) {
      return `${Math.floor(milliseconds / hour)}시간 전`;
    } else {
      return `${Math.floor(milliseconds / day)}일 전`;
    }
  }

  const getLastLoginPeriod = () => {
    if (session) {
      let stDate = new Date(session?.user?.lastLogin!);
      let endDate = new Date();
      let btMs = endDate.getTime() - stDate.getTime();
      let btDay = getTimeDiffString(btMs);
      return btDay;
    } else {
      return false;
    }
  };

  return (
    <UserProfileStyled>
      <ImgComponent
        // state 변경.
        // ui에 주사위 / 새로고침 누를때마다 state 변경. 변경되는값은
        // dropdown 이 scr의 personas
        // /뒤에 들어가는애가 uuid로 생성된값.svg
        src={
          session
            ? session?.user?.image!
            : "https://api.dicebear.com/5.x/personas/svg?seed=guest"
        }
        objectFit="cover"
        width="64px"
        height="64px"
        borderColor="transparent"
      />
      <UserInfoStyled>
        <TypoComponent fontSize="16px" fontWeight="semi-bold" textAlign="left">
          {session ? session?.user?.name! : "게스트"}
        </TypoComponent>
        <TypoComponent
          fontSize="14px"
          fontWeight="medium"
          textAlign="left"
          color="var(--color-point)"
          marginTop="4px"
        >
          {session ? session?.user?.email! : "guest@wourd.kr"}
        </TypoComponent>
        <TypoComponent
          fontSize="12px"
          fontWeight="light"
          color="var(--color-lightgrey)"
          textAlign="left"
          marginTop="8px"
        >
          {`마지막 접속: ${
            session ? getLastLoginPeriod() : "로그인이 필요합니다."
          }`}
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
