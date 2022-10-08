import React from "react";

interface InputTextTypes {
  id: string,
  placeHolder: string,
}

const InputText: React.FC<InputTextTypes> = ({ id, placeHolder }) => {

  return (
    <input type="text" id={id} placeholder={placeHolder}></input>
  );
};

InputText.defaultProps = {
  placeHolder: '정보를 입력해주세요.'
}

export default InputText;
