import React from "react";

interface FormTypes {
  children: any,
}

const Form: React.FC<FormTypes> = ({ children }) => {
  return (
    <form>{children}</form>
  );
};

Form.defaultProps = {

}

export default Form;
