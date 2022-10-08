import React from "react";
import styled from "styled-components";

const InputTextStyled = styled.input`
  width: 100%;
  height: 32px;
  border: 1px solid #999;
  background-color: #fff;
`;

interface InputTextTypes {
  id: string,
  placeHolder: string,
}

const InputTextComponent: React.FC<InputTextTypes> = ({ id, placeHolder }) => {

  return (
    <InputTextStyled type="text" id={id} placeholder={placeHolder}></InputTextStyled>
  );
};

InputTextComponent.defaultProps = {
  placeHolder: '정보를 입력해주세요.'
}

export default InputTextComponent;
