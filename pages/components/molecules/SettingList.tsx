import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import Icon from "../atoms/Icon";
import TypoComponent from "../atoms/Typo";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface SettingListTypes extends styledInterface{
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
      <TypoComponent fontSize="14px" fontWeight="regular" textAlign="left">
        {typo}
      </TypoComponent>
      {
        nextStep ? (
          // next step
          <Icon iconShape={faChevronRight} iconWidth="16px" iconHeight="16px" svgSize="12px" />
        ) : (
          // version text
          <TypoComponent fontSize="14px" fontWeight="semi-bold" color="rgba(0,0,0,.5)">
            {rightText}
          </TypoComponent>
        )
        
      }
    </SettingList>
  );
};

SettingListComponent.defaultProps = {};

export default SettingListComponent;
