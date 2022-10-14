import React from "react";
import styled from "styled-components";
import Label from "./Label";
import Checkbox from "./Checkbox";

interface MultiSelectTypes {
  id?: string;
  name: string;
  options: OptionTypes[];
}

interface OptionTypes {
  name: string;
  value: number;
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
}) => {
  return (
    <MultiSelectStyled id={id} name={name} options={options}>
      {options.map((o: any) => {
        return (
          <MSGridStyled key={o.name}>
            <Checkbox name={name} value={o.value} id={name + o.value} />
            <Label htmlFor={name + o.value} desc={o.name} />
          </MSGridStyled>
        );
      })}
    </MultiSelectStyled>
  );
};

MultiSelectComponent.defaultProps = {};

export default MultiSelectComponent;
