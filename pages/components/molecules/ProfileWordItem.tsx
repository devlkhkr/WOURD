import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import Icon from "../atoms/Icon";
import TypoComponent from "../atoms/Typo";

import {
  faLightbulb,
  faCircleQuestion,
  faStar,
  faForward
} from "@fortawesome/free-solid-svg-icons";

interface ProfileWordTitleTypes extends styledInterface {
  typo: string;
  color: string;
  wordIcon: string;
}

const ProfileWordItem = styled.li`
  width: calc(25% - 24px / 4);
  padding : 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  justify-content: space-between;
  color: ${props => props.color || "var(--color-black)"};
`;

const ProfileWordIconWrap = styled.div`
  padding: 8px;
  margin-bottom : 8px;
  border-radius : 50%;
  background-color : #cccccc;
`;

const ProfileWordItemComponent: React.FC<ProfileWordTitleTypes> = props => {
  const { typo, color, wordIcon } = props;

  const setWordIcon = () => {
    switch (wordIcon) {
      case "know":
        return (
          <Icon
            iconShape={faLightbulb}
            iconWidth="24px"
            iconHeight="24px"
            svgSize="24px"
            color="var(--color-point)"
          />
        );
      case "dontknow":
        return (
          <Icon
            iconShape={faCircleQuestion}
            iconWidth="24px"
            iconHeight="24px"
            svgSize="24px"
            color="var(--color-point)"
          />
        );
      case "favorite":
        return (
          <Icon
            iconShape={faStar}
            iconWidth="24px"
            iconHeight="24px"
            svgSize="24px"
            color="var(--color-point)"
          />
        );
      case "skip":
        return (
          <Icon
            iconShape={faForward}
            iconWidth="24px"
            iconHeight="24px"
            svgSize="24px"
            color="var(--color-point)"
          />
        );
      default:
        return;
    }
  };

  return (
    <ProfileWordItem>
      {wordIcon && <ProfileWordIconWrap>{setWordIcon()}</ProfileWordIconWrap>}
      <TypoComponent
        fontSize="16px"
        fontWeight="semi-bold"
        textAlign="left"
        color={color}
      >
        {typo}
      </TypoComponent>
    </ProfileWordItem>
  );
};

ProfileWordItemComponent.defaultProps = {};

export default ProfileWordItemComponent;
