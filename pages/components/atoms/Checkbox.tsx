import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface CheckboxTypes extends styledInterface {
  id: string;
  name: string;
  onClick?: any;
  defaultChecked?: boolean;
  value?: number;
}

const CheckboxStyled = styled.input<CheckboxTypes>`
  appearance: none;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid var(--color-lightgrey);
  border-radius: 2px;
  position: relative;
  &:before {
    display: none;
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-point);
    border-radius: inherit;
    z-index: 1;
  }
  &:checked:before {
    display: inline-block;
  }
`;

const InputRadioComponent: React.FC<CheckboxTypes> = ({
  id,
  name,
  onClick,
  defaultChecked,
}) => {
  return (
    <CheckboxStyled
      type="checkbox"
      id={id}
      name={name}
      onClick={onClick}
      defaultChecked={defaultChecked}
    ></CheckboxStyled>
  );
};

InputRadioComponent.defaultProps = {};

export default InputRadioComponent;
