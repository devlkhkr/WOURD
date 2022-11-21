import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import ImgComponent from "../atoms/Img";
import TypoComponent from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";
interface SystemDevType extends styledInterface {
  pos: string;
  name: string;
  github: string;
  mail: string;
}

const DevsItem = styled.li`
  width : 50%;
  border-radius : 16px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  & > div {
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
  }
`

const DevsInfo = styled.div`
  width : 100%;
  padding: 24px 24px 8px 24px;
`

const DevSocial = styled.div`
  padding : 8px 24px 24px 24px;
  border-top : 1px solid rgba(0,0,0,0.1);
`


const SystemDevsComponent: React.FC<SystemDevType> = ({
  pos, name, github, mail
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
      
      </DevSocial>
    </DevsItem>
  );
};

SystemDevsComponent.defaultProps = {};

export default SystemDevsComponent;
