import React from "react";
import styled from "styled-components";

interface InputWrapTypes {
  children: any;
}

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
