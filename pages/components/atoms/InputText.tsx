import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"

const Input = styled.input`
  width: ${(props) => props.width || "100%"};
  height: 40px;
  border-style: solid;
  border-width: 0 0 1px;
  border-color: var(--color-lightgrey);
  background-color: #fff;
  padding: 0 8px;
  border-radius: 0;
  position: relative;
  outline: none;
  &::placeholder {
    color: var(--color-grey);
  }
  &:focus{
    border-color: #222;
  }
  &:read-only{
    background-color: #f3f3f3;
  }
  &[data-valid-state=valid]{
    border-color: #3bc831;
  }
  &[data-valid-state=err]{
    border-color: #e51937;
  }
`;

interface InputTextTypes extends styledInterface {
  type: string;
  placeHolder?: string;
  readonly?: boolean;
  onChange?: any;
  onBlur?: any;
  onKeyUp?: any;
  reference?: any;
}

const InputText: React.FC<InputTextTypes> = ({ type, width, id, placeHolder, readonly, onChange, onBlur, onKeyUp, reference }) => {
  return <Input 
    type={type}
    width={width}
    placeholder={placeHolder}
    id={id}
    readOnly={readonly}
    onChange={onChange}
    onBlur={onBlur}
    onKeyUp={onKeyUp}
    ref={reference}
  />
};

InputText.defaultProps = {
  placeHolder: "정보를 입력해주세요.",
  readonly: false,
};

export default InputText;
