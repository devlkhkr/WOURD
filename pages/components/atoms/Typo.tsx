import React from "react";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface TypoType extends styledInterface {
  onClick?: MouseEventHandler;
  lineClamp?: string;
}

const TypoStyled = styled.div<TypoType>`
  font-size: ${(props) => props.fontSize || "14px"};
  font-weight: ${(props) => `var(--weight-${props.fontWeight || "regular"})`};
  line-height: ${(props) => props.lineHeight || "1.2"};
  color: ${(props) => props.color || "inherit"};
  text-align: ${(props) => props.textAlign || "center"};
  margin-top: ${(props) => props.marginTop || "unset"};
  margin-bottom: ${(props) => props.marginBottom || "unset"};
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.lineClamp || "unset"};
  -webkit-box-orient: vertical;
`;

const TypoComponent: React.FC<TypoType> = ({
  fontSize,
  fontWeight,
  textAlign,
  lineHeight,
  color,
  marginTop,
  lineClamp,
  children,
  className,
  onClick,
  marginBottom
}) => {
  return (
    <TypoStyled
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      lineHeight={lineHeight}
      color={color}
      marginTop={marginTop}
      lineClamp={lineClamp}
      className={className}
      onClick={onClick}
      marginBottom={marginBottom}
    >
      {children}
    </TypoStyled>
  );
};

TypoComponent.defaultProps = {};

export default TypoComponent;
