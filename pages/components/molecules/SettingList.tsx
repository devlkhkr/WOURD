import React from "react";
import styled from "styled-components";
import Icon from "../atoms/Icon";
import TypoComponent from "../atoms/Typo";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface SettingListTypes {
  typo: String;
}

const SettingList = styled.div`
  display : flex;
  align-items : center;
  justify-content : space-between;
  color : $black;
`

const SettingListComponent: React.FC<SettingListTypes> = props => {
  const { typo } = props;
  return (
    <SettingList>
      <TypoComponent weight="regular" align="left">
        {typo}
      </TypoComponent>
      <Icon iconShape={faChevronRight} iconWidth={24} iconHeight={24} bottom={4} />
    </SettingList>
  );
};

SettingListComponent.defaultProps = {};

export default SettingListComponent;
