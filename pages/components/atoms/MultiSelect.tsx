import React, { useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";
import Label from "./Label";
import Checkbox from "./Checkbox";
import styledInterface from "../Intefaces/styledComponent";
interface MultiSelectTypes extends styledInterface {
  name: string;
  options: OptionTypes[];
  reference?: any;
}

interface OptionTypes {
  name: string;
  value: number;
  defaultChecked?: boolean;
}

const MultiSelectStyled = styled.div<MultiSelectTypes>`
  display: flex;
  flex-wrap: wrap;
`;

const MSGridStyled = styled.div`
  flex: auto;
  min-width: 50%;
  &:nth-child(n + 3) {
    margin-top: 8px;
  }
`;

const MultiSelectComponent: React.FC<MultiSelectTypes> = ({
  id,
  name,
  options,
  reference,
}) => {
  const multiSelectRefs: any = useRef([]);
  const getValue = () => {
    let checkedValuesArr: string[] = new Array(options.length);
    // let checkedInputs = multiSelectRefs.current.filter(
    //   (checkbox: HTMLInputElement) => checkbox.checked == true
    // );
    multiSelectRefs.current.map((el: HTMLInputElement, index: number) => {
      let value = el.checked ? "1" : "0";
      checkedValuesArr[index] = value;
    });
    return checkedValuesArr;
  };
  useImperativeHandle(reference, () => ({
    getValue,
  }));
  return (
    <MultiSelectStyled id={id} name={name} options={options}>
      {options.map((o: any, index: any) => {
        return (
          <MSGridStyled key={o.name}>
            <Checkbox
              name={name}
              value={o.value}
              id={name + o.value}
              defaultChecked={o.defaultChecked}
              reference={(checkbox: HTMLInputElement) =>
                (multiSelectRefs.current[index] = checkbox)
              }
            />
            <Label htmlFor={name + o.value} desc={o.name} />
          </MSGridStyled>
        );
      })}
    </MultiSelectStyled>
  );
};

MultiSelectComponent.defaultProps = {};

export default MultiSelectComponent;
