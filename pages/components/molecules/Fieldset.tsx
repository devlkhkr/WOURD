import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface FieldsetTypes extends styledInterface {
  
}

const FieldsetStyled = styled.fieldset<FieldsetTypes>`
  padding: 16px 0;
  & + & {
    border-top: 1px solid var(--color-ash);
  }
`;

const FieldsetComponent: React.FC<FieldsetTypes> = ({ children }) => {
  return <FieldsetStyled>{children}</FieldsetStyled>;
};

FieldsetComponent.defaultProps = {};

export default FieldsetComponent;
