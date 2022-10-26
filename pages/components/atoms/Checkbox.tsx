import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface CheckboxTypes extends styledInterface {
  onClick?: any;
  defaultChecked?: boolean;
  value?: number;
  isToggle?: boolean;
}

const CheckboxStyled = styled.input<CheckboxTypes>`
  appearance: none;
  ${props =>
    props.isToggle
      ? // isToggle이 true일때 (Setting 단어노출제어)
        `
          width: 48px;
          height: 24px;
          display: block;
          position: relative;
          border-radius: 16px;
          background-color: var(--color-white);
          box-shadow: 0 0 4px 1px rgba(0 0 0 / 15%);
          cursor: pointer;
          transition : background-color 0.2s ease-in;
            &::after{
              width: 16px;
              height: 16px;
              content:'';
              display : block;
              position: absolute;
              top: 50%;
              left: 4px;
              transform: translateY(-50%);
              border-radius: 50%;
              background: var(--color-point);
              transition : left 0.2s ease-in;
            }
            &:checked {
              background-color : var(--color-point);
              &::after{
                background-color : var(--color-white);
                left: calc(100% - 20px);
              }
            }
        `
      : // isToggle이 false일때 (default checkbox)
        `
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
      `}
`;

const InputRadioComponent: React.FC<CheckboxTypes> = ({
  id,
  name,
  onClick,
  defaultChecked,
  isToggle,
}) => {
  return (
    <CheckboxStyled
      type="checkbox"
      id={id}
      name={name}
      onClick={onClick}
      defaultChecked={defaultChecked}
      isToggle={isToggle}
    ></CheckboxStyled>
  );
};

InputRadioComponent.defaultProps = {};

export default InputRadioComponent;
