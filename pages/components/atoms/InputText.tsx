import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 32px;
  border: 1px solid #999;
  background-color: #fff;
  padding: 0 8px;
  &::placeholder {
    color: var(--color-grey);
  }
`;

interface InputTextTypes {
  id: string;
  placeHolder: string;
}

const InputText: React.FC<InputTextTypes> = ({ id, placeHolder }) => {
  return <Input type="text" id={id} placeholder={placeHolder}></Input>;
};

InputText.defaultProps = {
  placeHolder: "정보를 입력해주세요.",
};

export default InputText;
