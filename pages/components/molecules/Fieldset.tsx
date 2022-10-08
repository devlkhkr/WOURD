import React from "react";

interface FieldsetTypes {
  children: any,
}

const Fieldset: React.FC<FieldsetTypes> = ({ children }) => {
  return (
    <fieldset>{children}</fieldset>
  );
};

Fieldset.defaultProps = {

}

export default Fieldset;
