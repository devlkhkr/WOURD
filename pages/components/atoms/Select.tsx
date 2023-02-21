import React from "react";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
interface SelectTypes extends styledInterface {
  name: string;
  options: object[];
  reference?: any;
}

const SelectWrapStyled = styled.div`
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: rotate(45deg) translate(-6px, -50%);
    border: solid var(--color-grey);
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
  }
`;

const SelectStyled = styled.select<SelectTypes>`
  appearance: none;
  width: 100%;
  height: 40px;
  border: 1px solid var(--color-lightgrey);
  background-color: #fff;
  font-size: 14px;
  color: var(--color-black);
  padding: 0 8px;
`;

const SelectComponent: React.FC<SelectTypes> = ({
  id,
  name,
  options,
  reference,
}) => {
  return (
    <SelectWrapStyled>
      <SelectStyled id={id} name={name} options={options} ref={reference}>
        {options ? (
          options.map((o: any) => {
            return (
              <option key={o.value} value={o.value}>
                {o.name}
              </option>
            );
          })
        ) : (
          <></>
        )}
      </SelectStyled>
    </SelectWrapStyled>
  );
};

SelectComponent.defaultProps = {};

export default SelectComponent;
