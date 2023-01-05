import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImgComponent from "../atoms/Img";
import TypoComponent from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";
import Icon from "../atoms/Icon";
import {
  faGithub,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";
import Mailto from "../atoms/Mailto";
interface SystemDevType extends styledInterface {
  pos: string;
  name: string;
  github: string;
  instagram: string;
  mail: string;
}

const DevsItem = styled.li`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 16px;
`;

const DevsInfo = styled.div`
  max-width: 120px;
  width: 40%;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DevSocial = styled.div`
  width: 60%;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
`;

const IconWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const LinkTo = styled.a`
  color: black;
`;

const SystemDevsComponent: React.FC<SystemDevType> = ({
  pos,
  name,
  github,
  instagram,
  mail,
}) => {
  const [userImgUrl, setUserImgUsrl] = useState()
  const getUserImg = async (userId: string) => {
    try {
      await axios
      .get(`https://api.github.com/users/${userId}`)
      .then(res => {
        const { data : { avatar_url } } = res
        setUserImgUsrl(avatar_url)
      });
    } catch {
      console.log("오류");
    }
  };

  useEffect(() => {
    getUserImg(github)
  }, [])

  return (
    <DevsItem>
      <DevsInfo>
        <ImgComponent
          src={userImgUrl}
          objectFit="cover"
          width="64px"
          height="64px"
          borderColor="rgba(0,0,0,0.1)"
        />
      </DevsInfo>
      <DevSocial>
        <TypoComponent
          fontSize="16px"
          fontWeight="bold"
          color="#202020"
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
        <IconWrap>
          <Link href={`https://github.com/${github}`} passHref>
            <LinkTo target="_blank" rel="noopener noreferrer">
              <Icon iconShape={faGithub} iconWidth="22px" iconHeight="22px" />
            </LinkTo>
          </Link>
          <Link href={`https://www.instagram.com/${instagram}`} passHref>
            <LinkTo target="_blank" rel="noopener noreferrer">
              <Icon
                iconShape={faInstagramSquare}
                iconWidth="22px"
                iconHeight="22px"
              />
            </LinkTo>
          </Link>
          <Mailto name={name} addr={mail}>
            <Icon iconShape={faEnvelope} iconWidth="22px" iconHeight="22px" />
          </Mailto>
        </IconWrap>
      </DevSocial>
    </DevsItem>
  );
};

SystemDevsComponent.defaultProps = {};

export default SystemDevsComponent;
