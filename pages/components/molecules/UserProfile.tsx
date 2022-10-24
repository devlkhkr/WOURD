import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import ImgComponent from "../atoms/Img";
import TypoComponent from "../atoms/Typo";

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
`;

const UserInfoStyled = styled.div<UserProfileTypes>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  flex: 1 1;
`;

const UserProfileComponent: React.FC<UserProfileTypes> = ({
  username,
  usermail,
}) => {
  return (
    <UserProfileStyled>
      <ImgComponent src="https://w.namu.la/s/819be1bb98456607507be41201b6418c2a713302c52c359f4f4ae579af6fa78db7ad4a01cf994092f5442b785fc554fcc1a0d119fc41d8ff7ef2003c066b8a4c96cd745de2155092a4a23e7d05a31e3051bc8c88bc28ea8f10212e6fe18132e9" objectFit="cover"/>
      <UserInfoStyled>
        <TypoComponent fontSize="16px" fontWeight="semi-bold" textAlign="left">
          {username}
        </TypoComponent>
        <TypoComponent
          fontSize="14px"
          fontWeight="medium"
          textAlign="left"
          color="var(--color-point)"
          marginTop="4px"
        >
          {usermail}
        </TypoComponent>
      </UserInfoStyled>
      <Icon iconShape={faChevronRight} iconWidth="16px" iconHeight="16px" svgSize="12px" />
    </UserProfileStyled>
  );
};

UserProfileComponent.defaultProps = {};

export default UserProfileComponent;
