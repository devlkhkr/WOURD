import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface MaskType {
  onClick?: MouseEventHandler;
  trnsp?: boolean;
}

const MaskStyled = styled.div<MaskType>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 19998;
  background-color: ${(props) =>
    props.trnsp ? "transparent" : "rgba(0, 0, 0, 0.05);"};
`;

const Mask: React.FC<MaskType> = ({ onClick, trnsp }) => {
  return <MaskStyled onClick={onClick} trnsp={trnsp}></MaskStyled>;
};

export default Mask;
