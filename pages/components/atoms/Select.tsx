import React from "react";
import styled from "styled-components";

interface SelectTypes {
  id?: string;
  name: string;
  options: any;
}

const SelectStyled = styled.select<SelectTypes>`
  appearance: none;
  width: 100%;
  height: 32px;
  border: 1px solid #999;
  background-color: #fff;
  padding: 0 8px;
`;

const SelectComponent: React.FC<SelectTypes> = ({ id, name, options }) => {
  return (
    <SelectStyled id={id} name={name} options={options}>
      {options.map((o: any) => {
        return <option value={o.value}>{o.name}</option>;
      })}
    </SelectStyled>
  );
};

SelectComponent.defaultProps = {};

export default SelectComponent;
