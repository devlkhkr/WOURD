import React from "react";

interface TextAreaTypes {
  id: string,
  placeholder?: string,
}

const TextAreaTypes: React.FC<TextAreaTypes> = ({ id, placeholder }) => {

  return (
    <textarea id={id} placeholder={placeholder}></textarea>
  );
};

TextAreaTypes.defaultProps = {

}

export default TextAreaTypes;
