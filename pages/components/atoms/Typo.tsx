import React from "react";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface TypoType extends styledInterface {
  onClick?: MouseEventHandler;
}

const TypoStyled = styled.div<TypoType>`
  font-size: ${(props) => props.fontSize || "14px"};
  font-weight: ${(props) => `var(--weight-${props.fontWeight})`};
  line-height: ${(props) => props.lineHeight || "1.2"};
  color: ${(props) => props.color || "inherit"};
  text-align: ${(props) => props.textAlign || "center"};
  margin-top: ${(props) => props.marginTop || "unset"};
`;

const TypoComponent: React.FC<TypoType> = ({
  fontSize,
  fontWeight,
  textAlign,
  lineHeight,
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
      lineHeight={lineHeight}
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
