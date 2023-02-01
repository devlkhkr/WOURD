import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import Logo from "../components/atoms/Logo";
import { useRouter } from "next/router";
import Icon from "./atoms/Icon";
import { signOut } from "next-auth/react";

interface HeaderComponentTypes {}

const HeaderWrapStyled = styled.header<HeaderComponentTypes>`
  background-color: blue;
  width: 100%;
  height: var(--height-header);
  background-color: #ffffff;
  position: relative;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.05);
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  h2 {
    font-size: 16px;
    font-weight: var(--weight-bold);
    color: var(--color-darkblue);
  }
`;

const topIconPosition = `
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;

const HistoryBack = styled.span`
  ${topIconPosition}
  left: 20px;
`;

const AddNewWord = styled.span`
  ${topIconPosition}
  right: 20px;
`;

const HeaderComponent: React.FC<HeaderComponentTypes> = ({}) => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState<boolean>();

  useEffect(() => {
    window.history.length > 1 ? setCanGoBack(true) : setCanGoBack(false);
  });

  const addNewWordClick = () => {
    router.push("/MyWords/Regist");
  };

  const getHdrTitle = (path: string) => {
    switch (path) {
      case "/":
        return (
          <Logo
            mainColor="var(--color-point)"
            subColor="var(--color-darkblue)"
          />
        );
      case "/MyWords":
        return <h2>단어장</h2>;
      case "/MyWords/Regist":
        return <h2>새로운 단어 등록</h2>;
      case "/MyWords/Regist/[...pid]":
        return <h2>단어 수정</h2>;
      case "/Setting":
        return <h2>설정</h2>;
      case "/Setting/Profile":
        return <h2>프로필 변경</h2>;
      default:
        return <></>;
    }
  };

  const getHdrRightIcon = (path: string) => {
    switch (path) {
      case "/Setting":
        return (
          <Icon
            iconShape={faArrowRightFromBracket}
            iconWidth="20px"
            iconHeight="20px"
            align="auto"
            color="var(--color-grey)"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/Login",
              })
            }
          />
        );
      case "/":
      case "/MyWords":
        return (
          <Icon
            iconShape={faPlus}
            iconWidth="20px"
            iconHeight="20px"
            align="auto"
            color="var(--color-grey)"
            onClick={addNewWordClick}
          />
        );
      default:
        return <></>;
    }
  };

  const addWordDeniedList = ["/Setting", "/MyWords/Regist"];

  return (
    <HeaderWrapStyled>
      {canGoBack ? (
        <HistoryBack>
          <Icon
            iconShape={faArrowLeft}
            iconWidth="20px"
            iconHeight="20px"
            align="auto"
            color="var(--color-grey)"
            onClick={router.back}
          />
        </HistoryBack>
      ) : (
        <></>
      )}
      <HeaderLogo>{getHdrTitle(router.pathname)}</HeaderLogo>

      <AddNewWord>{getHdrRightIcon(router.pathname)}</AddNewWord>
    </HeaderWrapStyled>
  );
};

export default HeaderComponent;
