import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faArrowsRotate,
  faPersonWalkingArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import Logo from "../components/atoms/Logo";
import { useRouter } from "next/router";
import Icon from "./atoms/Icon";
import { signIn, signOut, useSession } from "next-auth/react";
import { newConfirm } from "./templates/Confirm";
import { needLogin } from "pages/Login";
import TypoComponent from "./atoms/Typo";
import AnchorComponent from "./atoms/Anchor";

interface HeaderComponentTypes {}

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

const HeaderWrapStyled = styled.header<{ path: string }>`
  width: 100%;
  height: var(--height-header);
  background-color: #ffffff;
  position: relative;
  display: flex;
  justify-content: center;
  box-shadow: ${(props) =>
    props.path === "/Login" ? "unset" : "0px 0px 8px 2px rgba(0, 0, 0, 0.05)"};
`;

const EnterGuestStyled = styled.div`
  display: flex;
  align-items: center;
  * {
    display: inline-block;
    vertical-align: bottom;
  }
  i {
    margin-left: 4px;
  }
`;

const HeaderComponent: React.FC<HeaderComponentTypes> = ({}) => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState<boolean>();
  const { data: session, status } = useSession();

  useEffect(() => {
    window.history.length > 1 ? setCanGoBack(true) : setCanGoBack(false);
  });

  const addNewWordClick = () => {
    session != null ? router.push("/MyWords/Regist") : needLogin();
  };

  const getHdrTitle = (path: string) => {
    switch (path) {
      case "/Login":
        return <></>;
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
        return (
          <Logo
            mainColor="var(--color-point)"
            subColor="var(--color-darkblue)"
          />
        );
    }
  };

  const sysLogOut = () => {
    newConfirm({
      submitTit: "로그아웃",
      confirmText: "로그아웃 하시겠습니까?",
      confirmSubmit: () => {
        signOut({
          redirect: true,
          callbackUrl: "/Setting",
        });
        alert("로그아웃 되었습니다.");
      },
    });
  };

  const getHdrRightIcon = (path: string) => {
    switch (path) {
      case "/Setting":
        return (
          <Icon
            iconShape={
              session ? faArrowRightFromBracket : faArrowRightToBracket
            }
            iconWidth="20px"
            iconHeight="20px"
            align="auto"
            color="var(--color-grey)"
            onClick={() => {
              session ? sysLogOut() : signIn();
            }}
          />
        );
      case "/":
        return (
          <Icon
            iconShape={faArrowsRotate}
            iconWidth="20px"
            iconHeight="20px"
            align="auto"
            color="var(--color-grey)"
            onClick={() => {
              router.push(router.pathname);
            }}
          />
        );
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
      case "/Login":
        return (
          <EnterGuestStyled>
            <AnchorComponent href="/Setting" underline={true}>
              <TypoComponent fontSize="12px" color="var(--color-grey)">
                게스트로 둘러보기
              </TypoComponent>
              <Icon
                iconShape={faPersonWalkingArrowRight}
                iconWidth="16px"
                iconHeight="16px"
                color="var(--color-grey)"
              />
            </AnchorComponent>
          </EnterGuestStyled>
        );
      default:
        return <></>;
    }
  };

  return (
    <HeaderWrapStyled path={router.pathname}>
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
