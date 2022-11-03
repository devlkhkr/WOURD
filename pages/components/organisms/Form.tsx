import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface FormTypes extends styledInterface {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const FormStyled = styled.form<FormTypes>`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`;

const FormComponent: React.FC<FormTypes> = ({
  children,
  onSubmit,
  reference,
}) => {
  return (
    <FormStyled onSubmit={onSubmit} ref={reference}>
      {children}
    </FormStyled>
  );
};

FormComponent.defaultProps = {};

export default FormComponent;
