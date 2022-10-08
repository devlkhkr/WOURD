import React from "react";
import styled from "styled-components";
import Label from "./Label";

interface MultiSelectTypes {
  id?: string;
  name: string;
  options: any;
}

const MultiSelectStyled = styled.div<MultiSelectTypes>`
  display: flex;
  flex-wrap: wrap;
`;

const MSGridStyled = styled.div`
  flex: auto;
  min-width: 50%;
`;

const SelectComponent: React.FC<MultiSelectTypes> = ({ id, name, options }) => {
  return (
    <MultiSelectStyled id={id} name={name} options={options}>
      {options.map((o: any) => {
        return (
          <MSGridStyled>
            <input
              type="checkbox"
              name={name}
              value={o.value}
              id={name + o.value}
            />
            <Label htmlFor={name + o.value} desc={o.name} />
          </MSGridStyled>
        );
      })}
    </MultiSelectStyled>
  );
};

SelectComponent.defaultProps = {};

export default SelectComponent;
