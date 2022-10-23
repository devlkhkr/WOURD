import React from "react";
import styled from "styled-components";
import Icon from "../atoms/Icon";
import TypoComponent from "../atoms/Typo";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface SettingListTypes {
  typo: string;
  nextStep ?: boolean;
  rightText ?: string;
}

const SettingList = styled.div`
  height : 40px;
  display : flex;
  align-items : center;
  justify-content : space-between;
  color : var(--color-black);
  padding : 0 8px;
  border-bottom : 1px solid rgba(120,120,120, 0.2);
  &:first-child {
    border-top : 1px solid rgba(120,120,120, 0.2);
  }
`

const SettingListComponent: React.FC<SettingListTypes> = props => {
  const { typo, nextStep, rightText } = props;
  return (
    <SettingList>
      <TypoComponent size="14px" weight="regular" align="left">
        {typo}
      </TypoComponent>
      {
        nextStep ? (
          // next step
          <Icon iconShape={faChevronRight} iconWidth="16px" iconHeight="16px" />
        ) : (
          // version text
          <TypoComponent size="14px" weight="semi-bold">
            {rightText}
          </TypoComponent>
        )
        
      }
    </SettingList>
  );
};

SettingListComponent.defaultProps = {};

export default SettingListComponent;
