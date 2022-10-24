import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface SelectTypes extends styledInterface {
  name: string;
  options: any;
}

const SelectStyled = styled.select<SelectTypes>`
  appearance: none;
  width: 100%;
  height: 40px;
  border: 1px solid var(--color-lightgrey);
  background-color: #fff;
  padding: 0 8px;
`;

const SelectComponent: React.FC<SelectTypes> = ({ id, name, options }) => {
  return (
    <SelectStyled id={id} name={name} options={options}>
      {options.map((o: any) => {
        return (
          <option key={o.value} value={o.value}>
            {o.name}
          </option>
        );
      })}
    </SelectStyled>
  );
};

SelectComponent.defaultProps = {};

export default SelectComponent;
