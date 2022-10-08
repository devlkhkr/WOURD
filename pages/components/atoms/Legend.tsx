import React from "react";
import styled from "styled-components";
interface LegendTypes {
  desc: string
}

const LegendStyled = styled.fieldset<LegendTypes>`
  margin-top: 20px;
`;


const LegendComponent: React.FC<LegendTypes> = ({ desc }) => {

  return (
    <legend>{desc}</legend >
  );
};

LegendComponent.defaultProps = {

}

export default LegendComponent;