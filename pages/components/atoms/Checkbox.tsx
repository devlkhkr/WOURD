import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import checkIcon from "public/images/icons/check.png";
interface CheckboxTypes extends styledInterface {
  onChange?: any;
  defaultChecked?: boolean;
  value?: number;
  isToggle?: boolean;
  reference?: any;
}

const CheckboxStyled = styled.input<CheckboxTypes>`
  appearance: none;
  ${(props) =>
    props.isToggle
      ? // isToggle이 true일때 (Setting 단어노출제어)
        `
          width: 48px;
          height: 24px;
          display: block;
          position: relative;
          border-radius: 16px;
          background-color: var(--color-white);
          border: 1px solid var(--color-lightgrey);
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
              border-color : var(--color-point);
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
          border-radius: 4px;
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
            background-image: url(${checkIcon.src});
            background-repeat: no-repeat;
            background-size: 16px;
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
  value,
  onClick,
  onChange,
  defaultChecked,
  isToggle,
  reference,
}) => {
  return (
    <CheckboxStyled
      type="checkbox"
      id={id}
      name={name}
      value={value}
      onClick={onClick}
      onChange={onChange}
      defaultChecked={defaultChecked}
      isToggle={isToggle}
      ref={reference}
    ></CheckboxStyled>
  );
};

InputRadioComponent.defaultProps = {};

export default InputRadioComponent;
