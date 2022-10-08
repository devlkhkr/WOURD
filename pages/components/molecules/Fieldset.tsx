import React from "react";
import styled from "styled-components";

interface FieldsetTypes {
  children: any,
}

const FieldsetStyled = styled.fieldset<FieldsetTypes>`
  margin-top: 20px;
`;

const FieldsetComponent: React.FC<FieldsetTypes> = ({ children }) => {
  return (
    <FieldsetStyled>{children}</FieldsetStyled>
  );
};

FieldsetComponent.defaultProps = {

}

export default FieldsetComponent;
