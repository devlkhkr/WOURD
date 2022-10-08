import React from "react";

type TextProps = {
  placeHolder: string
}

const InputText: React.FC<TextProps> = ({ placeHolder }) => {

  return (
    <div>
      <input type="text" placeholder={placeHolder}></input>
    </div>
  );
};

InputText.defaultProps = {
  placeHolder: '정보를 입력해주세요.'
}

export default InputText;
