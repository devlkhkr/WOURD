import React, { useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import Label from "../../components/atoms/Label";
import InputWrap from "../../components/molecules/InputWrap";
import styledInterface from "../../../functional/intefaces/styledComponent";
import checkIcon from "public/images/icons/check.png";
interface RadioTypes extends styledInterface {
  name: string;
  options: OptionTypes[];
  reference: any;
  defaultChecked?: number;
}

interface OptionTypes {
  name: string;
  value: number;
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
    background-image: url(${checkIcon.src});
    background-repeat: no-repeat;
    background-size: 16px;
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
  reference,
  defaultChecked,
}) => {
  const radioRefs: any = useRef([]);
  const getValue = () => {
    let checkedDom = radioRefs.current.filter(
      (radio: HTMLInputElement) => radio.checked == true
    );
    return checkedDom[0].value;
  };
  useImperativeHandle(reference, () => ({
    getValue,
  }));
  return (
    <div ref={reference}>
      {options ? (
        options.map((o: any, index: number) => {
          return (
            <InputWrap key={o.value}>
              <RadioStyled
                type="radio"
                id={`${name}_${o.value}`}
                name={name}
                value={o.value}
                onClick={onClick}
                defaultChecked={defaultChecked === o.value ? true : false}
                ref={(radioDom: HTMLInputElement) =>
                  (radioRefs.current[index] = radioDom)
                }
              ></RadioStyled>
              <Label htmlFor={`${name}_${o.value}`} desc={o.name} />
            </InputWrap>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

RadioComponent.defaultProps = {};

export default RadioComponent;
