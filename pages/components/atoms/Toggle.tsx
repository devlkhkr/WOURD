import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
import InputRadioComponent from "./Checkbox";
import TypoComponent from "./Typo";
interface ToggleCheckTypes extends styledInterface {
  typo?: string;
}

const ToggleCheckStyled = styled.div`
  padding : 8px;
  display : flex;
  align-items : center;
  justify-content: space-between;
`

const ToggleCheckComponent: React.FC<ToggleCheckTypes> = ({
  typo
}) => {
  return (
    <ToggleCheckStyled>
      <TypoComponent fontSize="14px" fontWeight="regular" textAlign="left">
        {typo}
      </TypoComponent>
      <InputRadioComponent 
        isToggle={true}
      />
    </ToggleCheckStyled>
  );
};

ToggleCheckComponent.defaultProps = {};

export default ToggleCheckComponent;
