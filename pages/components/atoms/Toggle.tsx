import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
import CheckboxComponent from "./Checkbox";
import TypoComponent from "./Typo";
interface ToggleCheckTypes extends styledInterface {
  typo?: string;
  defaultChecked?: boolean;
}

const ToggleCheckStyled = styled.div`
  display : flex;
  height: 40px;
  padding: 0 8px;
  align-items : center;
  justify-content: space-between;
`

const ToggleCheckComponent: React.FC<ToggleCheckTypes> = ({
  typo, defaultChecked
}) => {
  return (
    <ToggleCheckStyled>
      <TypoComponent fontSize="14px" fontWeight="regular" textAlign="left">
        {typo}
      </TypoComponent>
      <CheckboxComponent 
        isToggle={true}
        defaultChecked={defaultChecked}
      />
    </ToggleCheckStyled>
  );
};

ToggleCheckComponent.defaultProps = {};

export default ToggleCheckComponent;
