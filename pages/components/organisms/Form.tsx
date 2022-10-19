import React from "react";
import styled from "styled-components";
interface FormTypes {
  children: any;
}

const FormtStyled = styled.form<FormTypes>`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`;

const FormComponent: React.FC<FormTypes> = ({ children }) => {
  return <FormtStyled>{children}</FormtStyled>;
};

FormComponent.defaultProps = {};

export default FormComponent;
