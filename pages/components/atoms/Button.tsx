import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface ButtonTypes extends styledInterface {
  disabled?: boolean;
}

const ButtonStyled = styled.button<ButtonTypes>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-color: transparent;
  border-radius: 4px;
  font-size: ${(props) => props.fontSize || "14px"};
`;

const ButtonCompontent: React.FC<ButtonTypes> = ({
  id,
  desc,
  backgroundColor,
  color,
  width,
  height,
  className,
  onClick,
  fontSize,
  reference,
  disabled
}) => {
  return (
    <ButtonStyled
      id={id}
      type="button"
      backgroundColor={backgroundColor}
      color={color}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      desc={desc}
      fontSize={fontSize}
      ref={reference}
      disabled={disabled}
    >
      {desc}
    </ButtonStyled>
  );
};

ButtonCompontent.defaultProps = {};

export default ButtonCompontent;
