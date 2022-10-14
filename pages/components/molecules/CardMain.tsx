import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/atoms/Button";
import Typo from "../../components/atoms/Typo";

interface CardMainTypes {
  exposeWord: ExposeWordTypes[];
}

interface ExposeWordTypes {
  word: string;
  unravel?: string;
  desc: string;
}

const CardWrapStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
`;

const CardMainStyled = styled.div<CardMainTypes>`
  height: calc(100% - 40px);
`;

const BtnWrapCardCtrlStyled = styled.div`
  height: 40px;
  text-align: center;
  button + button {
    margin-left: 8px;
  }
`;

const InputRadioComponent: React.FC<CardMainTypes> = ({
  exposeWord
}) => {
  const [wordIdx, setWordIdx] = useState(0);
  const cardPrevClick = function () {
    if (wordIdx != 0) setWordIdx(wordIdx - 1);
  }
  const cardNextClick = function () {
    if (wordIdx < (exposeWord.length - 1)) setWordIdx(wordIdx + 1);
  }
  return (
    <CardWrapStyled>
      <CardMainStyled
        exposeWord={exposeWord}
      >
        <Typo type="typo-lg">{exposeWord[wordIdx].word}</Typo>
        <Typo>{exposeWord[wordIdx].unravel}</Typo>
        <Typo>{exposeWord[wordIdx].desc}</Typo>
      </CardMainStyled>
      <BtnWrapCardCtrlStyled>
        <Button
          desc="이전카드"
          bgc="#666"
          color="#fff"
          width="40%"
          height="40px"
          onClick={cardPrevClick} />
        <Button
          desc="다음카드"
          bgc="#666"
          color="#fff"
          width="40%"
          height="40px"
          onClick={cardNextClick} />
      </BtnWrapCardCtrlStyled>
    </CardWrapStyled>
  );
};

InputRadioComponent.defaultProps = {};

export default InputRadioComponent;