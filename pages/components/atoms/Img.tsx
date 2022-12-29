import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface ImgTypes extends styledInterface{
  src?: any;
  alt?: string;
  objectFit?: string;
}

const ImgStyled = styled.img<ImgTypes>`
  display: inline-block;
  width: ${(props => props.width)};
  height: ${(props => props.height)};
  border-radius: 50%;
  border: 1px solid var(--color-deepgray);
  object-fit: ${(props) => props.objectFit || "unset"};
  margin-bottom : ${(props) => props.marginBottom || "0"};
`;
const ImgComponent: React.FC<ImgTypes>  = ({
  src, objectFit, marginBottom, width, height
}) => {
  return(
    <ImgStyled src={src} alt="user-image" width={width} height={height} objectFit={objectFit} marginBottom={marginBottom}/>
  )
};

ImgComponent.defaultProps = {};

export default ImgComponent;
