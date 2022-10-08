import React from "react";
import styled from "styled-components";

interface InputRadioTypes {
  id: string;
  name: string;
  onClick?: any;
  defaultChecked?: boolean;
}

const RadioStyled = styled.input<InputRadioTypes>`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

const InputRadioComponent: React.FC<InputRadioTypes> = ({
  id,
  name,
  onClick,
  defaultChecked,
}) => {
  return (
    <RadioStyled
      type="radio"
      id={id}
      name={name}
      onClick={onClick}
      defaultChecked={defaultChecked}
    ></RadioStyled>
  );
};

InputRadioComponent.defaultProps = {};

export default InputRadioComponent;
