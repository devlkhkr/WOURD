import React from "react";

interface InputRadioTypes {
  id: string,
  name: string,
}

const InputRadio: React.FC<InputRadioTypes> = ({ id, name }) => {

  return (
    <input type="radio" id={id} name={name}></input>
  );
};

InputRadio.defaultProps = {

}

export default InputRadio;
