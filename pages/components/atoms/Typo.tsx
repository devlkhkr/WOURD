import React from "react";
import styled from "styled-components";

interface TypoType {
  type?: string;
  children?: any;
}

const TypoStyled = styled.div<TypoType>`
    font-weight: var(--weight-regular);
    ${props => props.type === "typo-lg" &&
    `
      font-weight: var(--weight-bold);
      font-size: 24px;
    `} 
  }
`;

const TypoComponent: React.FC<TypoType> = ({
  type,
  children
}) => {
  return (
    <TypoStyled type={type}>{children}</TypoStyled>
  );
};

TypoComponent.defaultProps = {

};

export default TypoComponent;
