import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface MaskType {
  onClick: MouseEventHandler;
}

const MaskStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 19998;
  background-color: rgba(0, 0, 0, 0.05);
`;

const Mask: React.FC<MaskType> = ({ onClick }) => {
  return <MaskStyled onClick={onClick}></MaskStyled>;
};

export default Mask;
