import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface FormTypes extends styledInterface{
  children: any;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const FormtStyled = styled.form<FormTypes>`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`;

const FormComponent: React.FC<FormTypes> = ({ children, onSubmit, reference }) => {
  return <FormtStyled onSubmit={onSubmit} ref={reference}>{children}</FormtStyled>;
};

FormComponent.defaultProps = {};

export default FormComponent;
