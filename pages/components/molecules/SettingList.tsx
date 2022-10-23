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
  display : flex;
  align-items : center;
  justify-content : space-between;
  color : var(--color-black);
  padding : 8px 0;
  border-bottom : 1px solid var(--color-deepgrey);
  &:first-child {
    border-top : 1px solid var(--color-deepgrey);
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
          <Icon iconShape={faChevronRight} iconWidth={16} iconHeight={16} bottom={4} />
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
