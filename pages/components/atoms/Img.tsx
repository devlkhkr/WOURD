import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface ImgTypes extends styledInterface{
  src?: string;
  alt?: string;
  objectFit?: string;
}

const ImgStyled = styled.img<ImgTypes>`
  display: inline-block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid var(--color-deepgray);
  object-fit: ${(props) => props.objectFit || "unset"};
`;
const ImgComponent: React.FC<ImgTypes>  = ({
  src, objectFit
}) => {
  return(
    <ImgStyled src={src} alt="user-image" objectFit={objectFit} />
  )
};

ImgComponent.defaultProps = {};

export default ImgComponent;
