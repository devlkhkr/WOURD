import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface TextAreaTypes extends styledInterface {
  placeholder?: string;
  onChange?: any;
  defaultValue?: string;
}

const TextAreaStyled = styled.textarea<TextAreaTypes>`
  width: 100%;
  height: ${(props) => props.height};
  /* border: 1px solid var(--color-lightgrey); */
  border: 0;
  /* background-color: #f1f4fc; */
  background-color: #f4f7ff;
  padding: 12px;
  resize: none;
  border-radius: 8px;
  &::placeholder {
    color: var(--color-grey);
  }
`;

const TextAreaComponent: React.FC<TextAreaTypes> = ({
  id,
  placeholder,
  height,
  defaultValue,
  onChange,
}) => {
  return (
    <TextAreaStyled
      id={id}
      placeholder={placeholder}
      height={height}
      defaultValue={defaultValue}
      onChange={onChange}
    ></TextAreaStyled>
  );
};

TextAreaComponent.defaultProps = {};

export default TextAreaComponent;
