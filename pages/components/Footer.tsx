import React from "react";
import Link from "next/link";

import styled from "styled-components";

import Icon from "./atoms/icon";
import IconText from "./atoms/IconText";

import {
  faHouse,
  faNoteSticky,
  faNotesMedical,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const FooterWrap = styled.footer`
  ul {
    display: flex;
    align-items: center;
    border-top: 1px solid var(--color-grey);
    height: var(--height-footer);
    li {
      border-right: 1px solid var(--color-grey);
      background-color: var(--color-white);
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:first-child {
        border-left: 1px solid var(--color-grey);
      }
      a {
        text-decoration: none;
        font-weight: var(--weight-medium);
        color: var(--color-black);
        font-size: 16px;
      }
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterWrap>
      <ul>
        <li>
          <Link href="/">
            <a>
              <Icon
                iconShape={faHouse}
                iconWidth={30}
                iconHeight={30}
                bottom={4}
              />
              <IconText text="메인" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/RegistWord">
            <a>
              <Icon
                iconShape={faNoteSticky}
                iconWidth={30}
                iconHeight={30}
                bottom={4}
              />
              <IconText text="단어장" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/RegistWord">
            <a>
              <Icon
                iconShape={faNotesMedical}
                iconWidth={30}
                iconHeight={30}
                bottom={4}
              />
              <IconText text="단어관리" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/RegistWord">
            <a>
              <Icon
                iconShape={faInfoCircle}
                iconWidth={30}
                iconHeight={30}
                bottom={4}
              />
              <IconText text="설정" />
            </a>
          </Link>
        </li>
      </ul>
    </FooterWrap>
  );
};

export default Footer;
