import React from "react";
import styled from "styled-components";
import ImgComponent from "../atoms/Img";
import TypoComponent from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";
import Icon from "../atoms/Icon";
import { faGithub, faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
interface SystemDevType extends styledInterface {
  pos: string;
  name: string;
  github: string;
  mail: string;
}

const DevsItem = styled.li`
  width: 50%;
  border-radius: 16px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
`;

const DevsInfo = styled.div`
  width: 100%;
  padding: 24px 24px 8px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DevSocial = styled.div`
  padding: 16px 24px 16px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display : flex;
  align-items : center;
  justify-content : center;
  gap: 8px;
`;

const SystemDevsComponent: React.FC<SystemDevType> = ({
  pos,
  name,
  github,
  mail,
}) => {
  return (
    <DevsItem>
      <DevsInfo>
        <ImgComponent
          src="/images/img_user_default.jpg"
          objectFit="cover"
          width="64px"
          height="64px"
        />
        <TypoComponent
          fontSize="16px"
          fontWeight="bold"
          color="#202020"
          marginTop="8px"
        >
          {name}
        </TypoComponent>
        <TypoComponent
          fontSize="14px"
          fontWeight="medium"
          color="#999999"
          marginTop="4px"
        >
          {pos}
        </TypoComponent>
      </DevsInfo>
      <DevSocial>
        <Icon iconShape={faGithub} iconWidth="22px" iconHeight="22px" />
        <Icon iconShape={faInstagramSquare} iconWidth="22px" iconHeight="22px" />
        <Icon iconShape={faEnvelope} iconWidth="22px" iconHeight="22px" />
      </DevSocial>
    </DevsItem>
  );
};

SystemDevsComponent.defaultProps = {};

export default SystemDevsComponent;
