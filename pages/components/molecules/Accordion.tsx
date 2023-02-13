import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface AccordionTypes extends styledInterface {
  isOpened: boolean;
  childrenLength?: number;
}

const AccordionWrapsetStyled = styled.div<AccordionTypes>`
  transition-duration: 0.3s;
  overflow: hidden;
  max-height: 0;
  border-top: ${(props) =>
    props.isOpened ? "1px dashed rgba(120, 120, 120, 0.2);" : "0"};
  /* background-color: #f9f9f9; */
  ${(props) =>
    props.isOpened
      ? `
      max-height: ${props.childrenLength! * 40 + "px" || "0"};
    `
      : ``}

  & + * {
    border-top: 1px dashed #838da2;
  }
`;

const AccordionComponent: React.FC<AccordionTypes> = ({
  isOpened,
  children,
  childrenLength,
}) => {
  return (
    <AccordionWrapsetStyled isOpened={isOpened} childrenLength={childrenLength}>
      {children}
    </AccordionWrapsetStyled>
  );
};

AccordionComponent.defaultProps = {};

export default AccordionComponent;
