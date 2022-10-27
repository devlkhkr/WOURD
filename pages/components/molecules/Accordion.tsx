import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface AccordionTypes extends styledInterface {
  isOpened: boolean;
  childrenLength?: any;
}

const AccordionWrapsetStyled = styled.div<AccordionTypes>`
  transition-duration: 0.3s;
  overflow: hidden;
  max-height: 0;
  border-bottom: ${props => (props.isOpened ? "1px solid rgba(120, 120, 120, 0.45);" : "0")}
  ${(props) =>
    props.isOpened
      ? `
      max-height: ${props.childrenLength * 40 + "px" || "0"};
    `
      : ``}
`;

const AccordionComponent: React.FC<AccordionTypes> = ({
  isOpened,
  children,
}) => {
  return (
    <AccordionWrapsetStyled
      isOpened={isOpened}
      childrenLength={children.length}
    >
      {children}
    </AccordionWrapsetStyled>
  );
};

AccordionComponent.defaultProps = {};

export default AccordionComponent;
