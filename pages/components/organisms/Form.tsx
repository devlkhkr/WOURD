import React from "react";
import styled from "styled-components";
interface FormTypes {
  children: any;
}

const FormtSyled = styled.form<FormTypes>`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`;

const Form: React.FC<FormTypes> = ({ children }) => {
  return <FormtSyled>{children}</FormtSyled>;
};

Form.defaultProps = {};

export default Form;
