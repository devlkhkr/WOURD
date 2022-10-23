import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface TextAreaTypes extends styledInterface {
  placeholder?: string;
}

const TextAreaStyled = styled.textarea<TextAreaTypes>`
  width: 100%;
  height: ${(props) => props.height};
  border: 1px solid var(--color-lightgrey);
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
