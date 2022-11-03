import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";

const DevLogStyled = styled.div`
  display: inline-block;
  width: 100%;
`;

const FormComponent: React.FC = ({}) => {
  return <DevLogStyled>개발히스토리</DevLogStyled>;
};

FormComponent.defaultProps = {};

export default FormComponent;
