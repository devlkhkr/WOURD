import React from "react";
import styled from "styled-components";

interface TextAreaTypes {
  id: string;
  placeholder?: string;
  height?: number;
}

const TextAreaStyled = styled.textarea<TextAreaTypes>`
  width: 100%;
  height: ${(props) => props.height + `px`};
  padding: 8px;
  resize: none;
`;

const TextAreaComponent: React.FC<TextAreaTypes> = ({
  id,
  placeholder,
  height,
}) => {
  return (
    <TextAreaStyled
      id={id}
      placeholder={placeholder}
      height={height}
    ></TextAreaStyled>
  );
};

TextAreaComponent.defaultProps = {};

export default TextAreaComponent;
