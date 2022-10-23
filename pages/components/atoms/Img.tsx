import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface ImgTypes extends styledInterface{
  src?: string;
  alt?: string;
}

const ImgStyled = styled.img`
  display: inline-block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid var(--color-deepgray);
`;
const ImgComponent: React.FC<ImgTypes> = props => {
  const { src } = props;
  console.log(src);
  return <ImgStyled src={src} alt="user-image" />;
};

ImgComponent.defaultProps = {};

export default ImgComponent;
