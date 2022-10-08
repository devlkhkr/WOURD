import React from "react";
import styled from "styled-components";

const IconTextCon = styled.span<IconTypes>``;

interface IconTypes {
  text?: string;
}

const IconText: React.FC<IconTypes> = ({ text }) => {
  return <IconTextCon>{text}</IconTextCon>;
};

IconText.defaultProps = {};

export default IconText;
