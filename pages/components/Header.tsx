import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

const HeaderWrap = styled.header`
  background-color: blue;
  width: 100%;
  height: var(--height-header);
  background-color: #ffffff;
  position: relative;
  display: flex;
  justify-content: center;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 26px;
    color: #0047ab;
  }
  h1 {
    font-size: 26px;
    color: #0047ab;
    font-weight: var(--weight-black);
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    max-width: 80px;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderWrap>
      {/* <FontAwesomeIcon icon="fa-brands fa-discord" /> */}
      <HeaderLogo>
        {/* <FontAwesomeIcon icon={faBolt} />
        <h1>DINDER</h1> */}
        <Logo>
          <img src="/images/logo_dinder.png" />
        </Logo>
      </HeaderLogo>
    </HeaderWrap>
  );
};

export default Header;
