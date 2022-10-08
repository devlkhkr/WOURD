import React from "react";

interface LabelTypes {
  id?: string,
  htmlFor: string,
  desc: string
}

const Label: React.FC<LabelTypes> = ({ id, htmlFor, desc }) => {

  return (
    <label id={id} htmlFor={htmlFor}>{desc}</label >
  );
};

Label.defaultProps = {
  id: "",
  htmlFor: "",
  desc: ""
}

export default Label;
