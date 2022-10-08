import React from "react";
import styled from "styled-components";

interface LabelType {
  id?: string,
  htmlFor?: string,
  desc?: string
}

const LabelStyled = styled.label<LabelType>`
  vertical-align: middle;
`;

const LabelComponent: React.FC<LabelType> = ({ id, htmlFor, desc }) => {

  return (
    <LabelStyled id={id} htmlFor={htmlFor}>{desc}</LabelStyled>
  );
};

LabelComponent.defaultProps = {

}

export default LabelComponent;
