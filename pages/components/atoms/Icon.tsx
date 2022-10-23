import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";

const IconWrap = styled.i<IconTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.iconWidth};
  height: ${props => props.iconHeight};
  margin : 0 ${props => (props.align || "")} ${props => (props.bottom || "")};
  svg {
    font-size: 16px;
  }
`;

// margin: 0 ${props => props.align}px ${props => (props.bottom ? props.bottom : 4)}px;

interface IconTypes extends styledInterface{
  iconShape?: object;
  icon?: object;
  iconWidth?: string;
  iconHeight?: string;
  bottom?: string;
  align?: string;
}

const Icon: React.FC<IconTypes> = ({
  iconShape,
  iconWidth,
  iconHeight,
  bottom,
  align,
}) => {
  return (
    <IconWrap
      iconShape={iconShape}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      bottom={bottom}
      align={align}
    >
      <FontAwesomeIcon icon={iconShape} />
    </IconWrap>
  );
};

Icon.defaultProps = {};

export default Icon;
