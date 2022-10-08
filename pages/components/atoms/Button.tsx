import React from "react";

interface ButtonTypes {
  id: string,
  desc: string,
}

const Button: React.FC<ButtonTypes> = ({ id, desc }) => {

  return (
    <button id={id} type="button">{desc}</button>
  );
};

Button.defaultProps = {

}

export default Button;
