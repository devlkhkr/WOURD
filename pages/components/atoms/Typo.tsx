import React from "react";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface TypoType {
  size?: string;
  weight?: string;
  align?: string;
  className?: string;
  color?: string;
  mt?: string;
  children?: any;
  onClick?: MouseEventHandler;
}

const TypoStyled = styled.div<TypoType>`
    line-height: 1.2;
    font-weight: ${props => `var(--weight-${props.weight})`};
    font-size: ${props => props.size || "16px"};
    color: ${props => props.color || "inherit"};
    text-align: ${props => props.align || "center"};

    margin-top: ${props => props.mt || "unset"};
  }
`;

const TypoComponent: React.FC<TypoType> = ({
  size,
  weight,
  align,
  color,
  mt,
  children,
  className,
  onClick,
}) => {
  return (
    <TypoStyled
      size={size}
      weight={weight}
      align={align}
      color={color}
      mt={mt}
      className={className}
      onClick={onClick}
    >
      {children}
    </TypoStyled>
  );
};

TypoComponent.defaultProps = {};

export default TypoComponent;
