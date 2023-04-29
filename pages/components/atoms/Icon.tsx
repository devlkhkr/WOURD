import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";

const IconWrap = styled.i<IconWrapTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.iconWidth};
  height: ${(props) => props.iconHeight};
  margin: 0 ${(props) => props.align || ""} ${(props) => props.bottom || ""};
  color: ${(props) => props.color || "inherit"};
  svg {
    font-size: ${(props) => props.svgSize || "16px"};
    width: ${(props) => props.svgSize || "100%"};
    height: ${(props) => props.svgSize || "100%"};
  }
`;

const CustomIcon = styled(IconWrap)<IconWrapTypes>`
  background-image: ${(props) =>
    props.iconImg ? `url(../images/icons/${props.iconImg}.png)` : ""};
  background-size: cover;
  background-position: center;
`;

// margin: 0 ${props => props.align}px ${props => (props.bottom ? props.bottom : 4)}px;

interface IconTypes {
  // FIXME: SystemDevs의 github 아이콘때문에 유니온 타입으로 잠시 지정
  iconShape?: IconDefinition | any;
}
interface IconWrapTypes extends styledInterface {
  // icon fontawesome
  iconShape?: any;
  // icon custom
  iconImg?: string;
  iconWidth?: string;
  iconHeight?: string;
  bottom?: string;
  align?: string;
  svgSize?: string;
}

const Icon: React.FC<IconWrapTypes & IconTypes> = ({
  iconShape,
  iconImg,
  iconWidth,
  iconHeight,
  bottom,
  align,
  svgSize,
  color,
  onClick,
}) => {
  return (
    <>
      {iconShape ? (
        <IconWrap
          iconWidth={iconWidth}
          iconHeight={iconHeight}
          bottom={bottom}
          align={align}
          svgSize={svgSize}
          color={color}
          onClick={onClick}
        >
          <FontAwesomeIcon icon={iconShape} />
        </IconWrap>
      ) : (
        <CustomIcon
          iconImg={iconImg}
          iconWidth={iconWidth}
          iconHeight={iconHeight}
        />
      )}
    </>
  );
};

Icon.defaultProps = {};

export default Icon;
