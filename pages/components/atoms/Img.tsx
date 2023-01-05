import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface ImgTypes extends styledInterface {
  src?: string;
  alt?: string;
  objectFit?: string;
  borderColor?: string;
}

const ImgStyled = styled.img<ImgTypes>`
  display: inline-block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  border: ${(props) =>
    props.borderColor
      ? `1px solid ${props.borderColor}`
      : "1px solid transparent"};
  object-fit: ${(props) => props.objectFit || "unset"};
  margin-bottom: ${(props) => props.marginBottom || "0"};
`;
const ImgComponent: React.FC<ImgTypes> = ({
  src,
  objectFit,
  marginBottom,
  width,
  height,
  borderColor,
}) => {
  return (
    <ImgStyled
      src={src}
      alt="user-image"
      width={width}
      height={height}
      objectFit={objectFit}
      marginBottom={marginBottom}
      borderColor={borderColor}
    />
  );
};

ImgComponent.defaultProps = {};

export default ImgComponent;
