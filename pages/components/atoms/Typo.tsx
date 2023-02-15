import React from "react";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
interface TypoType extends styledInterface {
  onClick?: MouseEventHandler;
  lineClamp?: string;
}

const TypoStyled = styled.div<TypoType>`
  display: ${(props) => props.display || "-webkit-box"};
  font-size: ${(props) => props.fontSize || "14px"};
  font-weight: ${(props) => `var(--weight-${props.fontWeight || "regular"})`};
  line-height: ${(props) => props.lineHeight || "1.2"};
  color: ${(props) => props.color || "inherit"};
  text-align: ${(props) => props.textAlign || "left"};
  margin-top: ${(props) => props.marginTop || "unset"};
  margin-bottom: ${(props) => props.marginBottom || "unset"};
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  padding-left: ${(props) => props.paddingLeft || "0"};
  -webkit-line-clamp: ${(props) => props.lineClamp || "unset"};
  -webkit-box-orient: ${(props) => (props.lineClamp ? "vertical" : "unset")};
`;

const TypoComponent: React.FC<TypoType> = ({
  display,
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
  marginBottom,
  paddingLeft,
}) => {
  return (
    <TypoStyled
      display={display}
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
      paddingLeft={paddingLeft}
    >
      {children}
    </TypoStyled>
  );
};

TypoComponent.defaultProps = {};

export default TypoComponent;
