import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"

const Input = styled.input`
  width: 100%;
  height: 32px;
  border: 1px solid var(--color-lightgrey);
  background-color: #fff;
  padding: 0 8px;
  &::placeholder {
    color: var(--color-grey);
  }
`;

interface InputTextTypes extends styledInterface {
  type: string;
  placeHolder?: string;
}

const InputText: React.FC<InputTextTypes> = ({ type, id, placeHolder }) => {
  return <Input type={type} placeholder={placeHolder} id={id}></Input>;
};

InputText.defaultProps = {
  placeHolder: "정보를 입력해주세요.",
};

export default InputText;
