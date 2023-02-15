import React from "react";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
import Icon from "../atoms/Icon";
import TypoComponent from "../atoms/Typo";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface ProfileWordTitleTypes extends styledInterface {
  typo: string;
  afterIcon?: string;
}

const ProfileWordTitleList = styled.div`
  height: 40px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.color || "var(--color-black)"};
  border-top: 1px solid var(--color-lightgrey);
`;

const ProfileWordTitleComponent: React.FC<ProfileWordTitleTypes> = (props) => {
  const { typo, afterIcon, onClick, color } = props;
  const setAfterIcon = () => {
    // FIXME: 추후에 생성자함수로 공통적용
    switch (afterIcon) {
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
    <ProfileWordTitleList onClick={onClick}>
      <TypoComponent
        fontSize="14px"
        fontWeight="regular"
        textAlign="left"
        color={color}
      >
        {typo}
      </TypoComponent>
      {afterIcon && setAfterIcon()}
    </ProfileWordTitleList>
  );
};

ProfileWordTitleComponent.defaultProps = {};

export default ProfileWordTitleComponent;
