import React from "react";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
interface SelectTypes extends styledInterface {
  name: string;
  options: object[];
  reference?: any;
}

const SelectStyled = styled.select<SelectTypes>`
  appearance: none;
  width: 100%;
  height: 40px;
  border: 1px solid var(--color-lightgrey);
  background-color: #fff;
  padding: 0 8px;
`;

const SelectComponent: React.FC<SelectTypes> = ({
  id,
  name,
  options,
  reference,
}) => {
  return (
    <SelectStyled id={id} name={name} options={options} ref={reference}>
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
