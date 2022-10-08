import React from "react";
import styled from "styled-components";
interface LegendTypes {
  desc?: string
}

const LegendStyled = styled.fieldset<LegendTypes>`
  margin-top: 20px;
`;


const LegendComponent: React.FC<LegendTypes> = ({ desc }) => {

  return (
    <LegendStyled>{desc}</LegendStyled >
  );
};

LegendComponent.defaultProps = {

}

export default LegendComponent;
