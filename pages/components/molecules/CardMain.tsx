import React, { useState } from "react";
import styled from "styled-components";

interface CardMainTypes {
  exposeWord: ExposeWordTypes[];
}

interface ExposeWordTypes {
  word: string
  unravel?: string
}

const CardMainStyled = styled.div<CardMainTypes>`
  
`;

const InputRadioComponent: React.FC<CardMainTypes> = ({
  exposeWord
}) => {
  const [wordIdx, setWordIdx] = useState(0)
  return (
    <CardMainStyled
      exposeWord={exposeWord}
    >
      {exposeWord[wordIdx].word}
      {exposeWord[wordIdx].unravel}
    </CardMainStyled>
  );
};

InputRadioComponent.defaultProps = {};

export default InputRadioComponent;