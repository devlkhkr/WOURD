import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"

const Input = styled.input`
  width: ${(props) => props.width || "100%"};
  height: 40px;
  border: 1px solid var(--color-lightgrey);
  background-color: #fff;
  padding: 0 8px;
  border-radius: 0;
  &::placeholder {
    color: var(--color-grey);
  }
`;

interface InputTextTypes extends styledInterface {
  type: string;
  placeHolder?: string;
  readonly?: boolean;
  onChange?: any;
  reference?: any;
}

const InputText: React.FC<InputTextTypes> = ({ type, width, id, placeHolder, readonly, onChange, reference }) => {
  return <Input type={type} width={width} placeholder={placeHolder} id={id} readOnly={readonly} onChange={onChange} ref={reference}></Input>;
};

InputText.defaultProps = {
  placeHolder: "정보를 입력해주세요.",
  readonly: false,
};

export default InputText;
