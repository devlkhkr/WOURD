import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const IconWrap = styled.i<IconTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.iconWidth}px;
  height: ${props => props.iconHeight}px;
  margin: 0 auto ${props => (props.bottom ? props.bottom : 4)}px;
  svg {
    font-size: 20px;
  }
`;

interface IconTypes {
  iconShape?: any;
  icon?: any;
  iconWidth?: number;
  iconHeight?: number;
  bottom?: number;
}

const Icon: React.FC<IconTypes> = ({
  iconShape,
  icon,
  iconWidth,
  iconHeight,
  bottom,
}) => {
  return (
    <IconWrap
      iconShape={iconShape}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      bottom={bottom}
    >
      <FontAwesomeIcon icon={iconShape} />
    </IconWrap>
  );
};

Icon.defaultProps = {};

export default Icon;