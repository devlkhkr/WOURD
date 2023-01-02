import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import CheckboxComponent from "./Checkbox";
import TypoComponent from "./Typo";
interface ToggleCheckTypes extends styledInterface {
  typo?: string;
  defaultChecked?: boolean;
  onChange?: Function;
  reference?: any;
}

const ToggleCheckStyled = styled.div`
  display: flex;
  height: 40px;
  padding: 0 12px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed rgba(120, 120, 120, 0.2);
  &:last-of-type {
    border-bottom: 0;
  }
`;

const ToggleCheckComponent: React.FC<ToggleCheckTypes> = ({
  typo,
  defaultChecked,
  onChange,
  reference,
}) => {
  return (
    <ToggleCheckStyled>
      <TypoComponent fontSize="13px" fontWeight="regular" textAlign="left">
        {typo}
      </TypoComponent>
      <CheckboxComponent
        isToggle={true}
        defaultChecked={defaultChecked}
        onChange={onChange}
        reference={reference}
      />
    </ToggleCheckStyled>
  );
};

ToggleCheckComponent.defaultProps = {};

export default ToggleCheckComponent;
