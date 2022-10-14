import React from "react";
import styled from "styled-components";
import Label from "../../components/atoms/Label";
import InputWrap from "../../components/molecules/InputWrap";

interface RadioTypes {
  name: string;
  onClick?: any;
  options: OptionTypes[];
}

interface OptionTypes {
  name: string;
  value: number;
  defaultChecked?: boolean;
}

const RadioStyled = styled.input<OptionTypes>`
  appearance: none;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid var(--color-lightgrey);
  border-radius: 100%;
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

const RadioComponent: React.FC<RadioTypes> = ({
  name,
  onClick,
  options,
}) => {
  return (
    <>
      {options.map((o: any) => {
        return (
          <InputWrap key={o.value}>
            <RadioStyled
              type="radio"
              id={`${name}_${o.value}`}
              name={name}
              value={o.value}
              onClick={onClick}
              defaultChecked={o.defaultChecked}
            ></RadioStyled>
            <Label htmlFor={`${name}_${o.value}`} desc={o.name} />
          </InputWrap>
        )
      })}
    </>
  );
};

RadioComponent.defaultProps = {};

export default RadioComponent;
