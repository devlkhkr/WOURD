import React from "react";
import styled from "styled-components";

interface ButtonWrapsetTypes {
  children: any;
}

const ButtonWrapsetStyled = styled.div<ButtonWrapsetTypes>`
  display: flex;
  button {
    flex: auto;
    & + button {
      margin-left: 8px;
    }
  }
`;

const ButtonWrapComponent: React.FC<ButtonWrapsetTypes> = ({ children }) => {
  return <ButtonWrapsetStyled>{children}</ButtonWrapsetStyled>;
};

ButtonWrapComponent.defaultProps = {};

export default ButtonWrapComponent;
