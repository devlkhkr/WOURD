import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styled from "styled-components";

import Icon from "./atoms/Icon";
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
    // border-top: 1px solid var(--color-grey);
    height: var(--height-footer);
    li {
      // border-right: 1px solid var(--color-grey);
      background-color: var(--color-white);
      height: 100%;
      display: flex;
      flex: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:first-child {
        // border-left: 1px solid var(--color-grey);
      }
      &.active {
        a {
          color: var(--color-point);
        }
      }
      a {
        text-decoration: none;
        font-weight: var(--weight-medium);
        color: var(--color-grey);
        font-size: 12px;
        text-align: center;
      }
    }
  }
`;

const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <FooterWrap>
      <ul>
        <li className={router.pathname.includes('/MyWords') ? "active" : ""}>
          <Link href="/MyWords">
            <a>
              <Icon
                iconShape={faNoteSticky}
                iconWidth="24px"
                iconHeight="24px"
                bottom="4px"
                align="auto"
              />
              <IconText text="단어장" />
            </a>
          </Link>
        </li>
        <li className={router.pathname == "/" ? "active" : ""}>
          <Link href="/">
            <a>
              <Icon
                iconShape={faHouse}
                iconWidth="24px"
                iconHeight="24px"
                bottom="4px"
                align="auto"
              />
              <IconText text="메인" />
            </a>
          </Link>
        </li>
        <li className={router.pathname.includes('/Setting') ? "active" : ""}>
          <Link href="/Setting">
            <a>
              <Icon
                iconShape={faInfoCircle}
                iconWidth="24px"
                iconHeight="24px"
                bottom="4px"
                align="auto"
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
