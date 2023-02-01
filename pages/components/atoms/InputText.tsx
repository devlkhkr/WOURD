import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import { svgEmailIcon, svgPwIcon, svgSearchIcon } from "./SvgIcons";
const Input = styled.input`
  width: ${(props) => props.width || "100%"};
  height: 40px;
  border-style: solid;
  border-width: 0 0 1px;
  border-color: #e3e3e3;
  background-color: transparent;
  padding: 0 8px;
  border-radius: 0;
  position: relative;
  outline: none;

  &[class*="input_bg"] {
    background-repeat: no-repeat;
    background-position: center left 8px;
    background-size: 16px;
    padding-left: 40px;
  }
  &.input_bg {
    &_search {
      background-image: ${svgSearchIcon("838da2")};
    }
    &_email {
      background-image: ${svgEmailIcon("838da2")};
    }
    &_pw {
      background-image: ${svgPwIcon("838da2")};
    }
  }

  &::placeholder {
    color: var(--color-grey);
  }
  &:focus {
    border-color: #222;
    transition-duration: 0.3s;
  }
  &:read-only {
    background-color: #f6f7f8;
  }
  &[data-valid-state="valid"] {
    border-color: #3bc831;
  }
  &[data-valid-state="valid"]:not(:focus) {
    animation: breath 0.4s ease-in-out;
  }
  &[data-valid-state="err"] {
    border-color: #e51937;
  }
  &[data-valid-state="err"]:not(:focus) {
    animation: vibrate 0.2s ease-in-out 0s 2;
  }
`;

interface InputTextTypes extends styledInterface {
  type: string;
  placeHolder?: string;
  readonly?: boolean;
  onChange?: any;
  onBlur?: any;
  onKeyUp?: any;
  reference?: any;
  maxLength?: number;
  defaultValue?: string;
  bgType?: string;
  value?: string;
}

const InputText: React.FC<InputTextTypes> = ({
  type,
  width,
  id,
  placeHolder,
  maxLength,
  readonly,
  onChange,
  onBlur,
  onKeyUp,
  reference,
  defaultValue,
  className,
  value,
}) => {
  const getInputBgClass = (bgType: string) => {
    return "test";
  };
  return (
    <Input
      type={type}
      width={width}
      placeholder={placeHolder}
      maxLength={maxLength}
      id={id}
      readOnly={readonly}
      onChange={onChange}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      ref={reference}
      defaultValue={defaultValue}
      className={className}
      value={value}
      // className={bgType ? getInputBgClass(bgType) : ""}
    />
  );
};

InputText.defaultProps = {
  placeHolder: "정보를 입력해주세요.",
  readonly: false,
};

export default InputText;
