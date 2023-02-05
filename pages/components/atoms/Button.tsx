import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface ButtonTypes extends styledInterface {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ButtonStyled = styled.button<ButtonTypes>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height};
  padding: 0 ${(props) => (props.width === "auto" ? "32px" : "")};
  background-color: ${(props) => props.backgroundColor};
  margin-top: ${(props) => props.marginTop};
  color: ${(props) => props.color};
  border-color: transparent;
  border-radius: 8px;
  font-size: ${(props) => props.fontSize || "14px"};
`;

const ButtonCompontent: React.FC<ButtonTypes> = ({
  id,
  desc,
  backgroundColor,
  color,
  width,
  height,
  marginTop,
  className,
  onClick,
  onPointerDown,
  fontSize,
  reference,
  disabled,
  type,
}) => {
  return (
    <ButtonStyled
      id={id}
      type={type || "button"}
      backgroundColor={backgroundColor}
      color={color}
      width={width}
      height={height}
      marginTop={marginTop}
      className={className}
      onClick={onClick}
      onPointerDown={onPointerDown}
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
