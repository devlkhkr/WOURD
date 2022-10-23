import React from "react";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface TypoType extends styledInterface {
  onClick?: MouseEventHandler;
}

const TypoStyled = styled.div<TypoType>`
    line-height: 1.2;
    font-weight: ${props => `var(--weight-${props.fontWeight})`};
    font-size: ${props => props.fontSize || "16px"};
    color: ${props => props.color || "inherit"};
    text-align: ${props => props.textAlign || "center"};

    margin-top: ${props => props.marginTop || "unset"};
  }
`;

const TypoComponent: React.FC<TypoType> = ({
  fontSize,
  fontWeight,
  textAlign,
  color,
  marginTop,
  children,
  className,
  onClick,
}) => {
  return (
    <TypoStyled
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      color={color}
      marginTop={marginTop}
      className={className}
      onClick={onClick}
    >
      {children}
    </TypoStyled>
  );
};

TypoComponent.defaultProps = {};

export default TypoComponent;
