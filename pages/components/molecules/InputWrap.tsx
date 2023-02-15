import React from "react";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
interface InputWrapTypes extends styledInterface {}

const InputWrapStyled = styled.div<InputWrapTypes>`
  & + & {
    margin-top: 8px;
  }
`;

const InputWrapComponent: React.FC<InputWrapTypes> = ({ children }) => {
  return <InputWrapStyled>{children}</InputWrapStyled>;
};

InputWrapComponent.defaultProps = {};

export default InputWrapComponent;
