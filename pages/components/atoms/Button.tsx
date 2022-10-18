import React from "react";
import styled from "styled-components";
interface ButtonTypes {
  id?: string;
  desc?: string;
  bgc?: string;
  color?: string;
  width?: string;
  height?: string;
  className?: string;
  onClick?: any;
}

const ButtonStyled = styled.button<ButtonTypes>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgc};
  color: ${(props) => props.color};
  border-color: transparent;
  border-radius: 4px;
`;

const Button: React.FC<ButtonTypes> = ({
  id,
  desc,
  bgc,
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
      bgc={bgc}
      color={color}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    >
      {desc}
    </ButtonStyled>
  );
};

Button.defaultProps = {};

export default Button;
