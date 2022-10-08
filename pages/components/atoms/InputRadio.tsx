import React from "react";
import styled from "styled-components";

interface InputRadioTypes {
  id: string,
  name: string,
}

const InputRadioStyled = styled.input<InputRadioTypes>`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

const InputRadioComponent: React.FC<InputRadioTypes> = ({ id, name }) => {

  return (
    <InputRadioStyled type="radio" id={id} name={name}></InputRadioStyled>
  );
};

InputRadioComponent.defaultProps = {

}

export default InputRadioComponent;
