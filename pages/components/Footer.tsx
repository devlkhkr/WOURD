import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faNoteSticky,
  faNotesMedical,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
const FooterWrap = styled.footer`
  ul {
    display: flex;
    align-items: center;
    border-top: 1px solid var(--color-grey);
    li {
      border-right: 1px solid var(--color-grey);
      background-color: var(--color-white);
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px 0;
      &:first-child {
        border-left: 1px solid var(--color-grey);
      }
    }
  }
`;

const ButtonIcon = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-bottom: 4px;
  svg {
    font-size: 20px;
  }
`;

const ButtonText = styled.span`
  font-weight: var(--weight-medium);
  color: var(--color-black);
  font-size: 16px;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrap>
      <ul>
        <li>
          <Link href="/RegistWord">
            <a>Home</a>
          </Link>
        </li>
        {/* <li>
          <Link href="/">
            <ButtonIcon>
              <FontAwesomeIcon icon={faHouse} />
            </ButtonIcon>
            <ButtonText>메인</ButtonText>
          </Link>
        </li> */}
        {/* <li>
          <Link href="/RegistWord">
            <ButtonIcon>
              <FontAwesomeIcon icon={faNoteSticky} />
            </ButtonIcon>
            <ButtonText>단어장</ButtonText>
          </Link>
        </li>
        <li>
          <Link href="/">
            <ButtonIcon>
              <FontAwesomeIcon icon={faNotesMedical} />
            </ButtonIcon>
            <ButtonText>단어관리</ButtonText>
          </Link>
        </li>
        <li>
          <Link href="/">
            <ButtonIcon>
              <FontAwesomeIcon icon={faInfoCircle} />
            </ButtonIcon>
            <ButtonText>설정</ButtonText>
          </Link>
        </li> */}
      </ul>
    </FooterWrap>
  );
};

export default Footer;
