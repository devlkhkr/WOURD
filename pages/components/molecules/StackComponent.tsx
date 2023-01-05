import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImgComponent from "../atoms/Img";
import TypoComponent from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";

interface StackComponentType extends styledInterface {
  name: string;
  src: string;
  by: string;
  docs: string;
  desc: string;
}

const StackItemTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StackItemTitle = styled.div``;

const LinkTo = styled.a`
  text-decoration: none;
  &:visited, &{
    color: #202020;
  }
`;

const StackItem = styled.li`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 16px;
`;

const StackImgIcon = styled.i`
  display: inline-block;
  width: 56px;
  height: 56px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(140, 149, 159, 0.15);
  img {
    max-width: 60%;
    height: auto;
    max-height: 55%;
  }
`;

const StackItemBottom = styled.div`

`



const StackComponent: React.FC<StackComponentType> = ({
  name,
  src,
  by,
  docs,
  desc,
}) => {
  return (
    <StackItem>
      <StackItemTop>
        <StackItemTitle>
          <TypoComponent
            fontSize="16px"
            fontWeight="bold"
            textAlign="left"
            color="#202020"
            marginBottom="4px"
          >
            <Link href={docs} passHref>
            <LinkTo target="_blank" rel="noopener noreferrer">
              {name}
            </LinkTo>
            </Link>
          </TypoComponent>
          <TypoComponent
            fontSize="14px"
            textAlign="left"
            color="#202020"
          >
            By {by}
          </TypoComponent>          
        </StackItemTitle>
        <StackImgIcon>
          <ImgComponent src={`/images/spec/${src}`} />
        </StackImgIcon>
      </StackItemTop>
      <StackItemBottom>

      </StackItemBottom>
    </StackItem>
  );
};

StackComponent.defaultProps = {};

export default StackComponent;
