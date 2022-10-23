import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface ButtonTypes extends styledInterface {

}

const ButtonStyled = styled.button<ButtonTypes>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-color: transparent;
  border-radius: 4px;
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
    >
      {desc}
    </ButtonStyled>
  );
};

ButtonCompontent.defaultProps = {};

export default ButtonCompontent;
