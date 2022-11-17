import type { NextPage } from "next";
import Icon from "./components/atoms/Icon";
import { faFaceDizzy } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import TypoComponent from "./components/atoms/Typo";
import { useRouter } from "next/router";
import ButtonCompontent from "./components/atoms/Button";

const ErrorStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  color: var(--color-grey);
  i {
    margin-bottom: 16px;
  }
`;

const ErrorPage404: NextPage = () => {
  const router = useRouter();
  return (
    <ErrorStyled>
      <Icon
        iconShape={faFaceDizzy}
        iconWidth="40px"
        iconHeight="40px"
        svgSize="40px"
      />
      <TypoComponent fontSize="48px" fontWeight="bold">
        404
      </TypoComponent>
      <TypoComponent fontSize="16px" fontWeight="medium">
        Page Not Found
      </TypoComponent>
      <TypoComponent fontSize="14px" marginTop="24px" lineHeight="1.5">
        The Requested URL <br />"{router.asPath}"<br /> was not found on this
        server.
      </TypoComponent>
      <ButtonCompontent
        desc="메인화면으로 이동"
        height="40px"
        backgroundColor="var(--color-grey)"
        color="#fff"
        marginTop="40px"
        onClick={() => {
          router.push("/");
        }}
      />
    </ErrorStyled>
  );
};

export default ErrorPage404;
