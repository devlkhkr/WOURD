import React from "react";
import styled from "styled-components";

interface InputRadioTypes {
  id: string,
  name: string,
}

const RadioStyled = styled.input<InputRadioTypes>`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

const InputRadioComponent: React.FC<InputRadioTypes> = ({ id, name }) => {

  return (
    <RadioStyled type="radio" id={id} name={name}></RadioStyled>
  );
};

InputRadioComponent.defaultProps = {

}

export default InputRadioComponent;
