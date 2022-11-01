import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import Typo from "../atoms/Typo";
interface CardBacksideTypes extends styledInterface {
  word_name: string;
  word_unravel: string;
  word_desc: string;
}

const CardBackStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  padding: 16px 16px 80px;
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
  border-radius: 16px;
  transform: rotateY(180deg);
  background: linear-gradient(#3f88ef, #0047ab);
  color: #fff;
  > div {
    & + div {
      margin-top: 4px;
    }
  }
`;

const ButtonWrapComponent: React.FC<CardBacksideTypes> = ({
  word_name,
  word_unravel,
  word_desc,
}) => {
  return (
    <CardBackStyled>
      <Typo fontSize="24px" fontWeight="bold">
        {word_name}
      </Typo>
      <Typo fontSize="16px" fontWeight="semi-bold">
        {word_unravel}
      </Typo>
      <Typo fontSize="14px" fontWeight="regular" textAlign="left">
        {word_desc}
      </Typo>
    </CardBackStyled>
  );
};

ButtonWrapComponent.defaultProps = {};

export default ButtonWrapComponent;
