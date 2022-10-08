import React from "react";
import styled from "styled-components";

interface FormTypes {
  children: any,
}

const FormStyled = styled.fieldset<FormTypes>`
  margin-top: 20px;
`;

const FormComponent: React.FC<FormTypes> = ({ children }) => {
  return (
    <FormStyled>{children}</FormStyled>
  );
};

FormComponent.defaultProps = {

}

export default FormComponent;
