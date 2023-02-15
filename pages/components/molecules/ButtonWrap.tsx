import React from "react";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
interface ButtonWrapTypes extends styledInterface {}

const ButtonWrapsetStyled = styled.div<ButtonWrapTypes>`
  display: flex;
  margin-top: 24px;
  button {
    flex: auto;
    & + button {
      margin-left: 8px;
    }
  }
`;

const ButtonWrapComponent: React.FC<ButtonWrapTypes> = ({ children }) => {
  return <ButtonWrapsetStyled>{children}</ButtonWrapsetStyled>;
};

ButtonWrapComponent.defaultProps = {};

export default ButtonWrapComponent;
