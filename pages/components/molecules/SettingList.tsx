import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import Icon from "../atoms/Icon";
import TypoComponent from "../atoms/Typo";

import {
  faChevronRight,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

interface SettingListTypes extends styledInterface {
  typo: string;
  afterIcon?: string;
  rightTypo?: string;
}

const SettingList = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.color || "var(--color-black)"};
  padding: 0 8px;
  border-bottom: 1px dashed rgba(120, 120, 120, 0.2);
  &:first-child {
    border-top: 1px solid rgba(120, 120, 120, 0.45);
  }
`;

const SettingListComponent: React.FC<SettingListTypes> = props => {
  const { typo, afterIcon, rightTypo, onClick, color } = props;
  const setAfterIcon = () => {
    switch (afterIcon) {
      case "arr-right":
        return (
          <Icon
            iconShape={faChevronRight}
            iconWidth="16px"
            iconHeight="16px"
            svgSize="12px"
          />
        );
      case "arr-down":
        return (
          <Icon
            iconShape={faChevronDown}
            iconWidth="16px"
            iconHeight="16px"
            svgSize="12px"
          />
        );
      case "arr-up":
        return (
          <Icon
            iconShape={faChevronUp}
            iconWidth="16px"
            iconHeight="16px"
            svgSize="12px"
          />
        );
      default:
        return;
    }
  };

  return (
    <SettingList onClick={onClick}>
      <TypoComponent fontSize="14px" fontWeight="regular" textAlign="left" color={color}>
        {typo}
      </TypoComponent>
      {rightTypo && <TypoComponent color="var(--color-grey)">{rightTypo}</TypoComponent>}
      {afterIcon && setAfterIcon()}
    </SettingList>
  );
};

SettingListComponent.defaultProps = {};

export default SettingListComponent;
