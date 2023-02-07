import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import styled from "styled-components";

import InputText from "../atoms/InputText";
import { svgCheckIcon } from "../atoms/SvgIcons";
import TypoComponent from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";

interface ProfileListTypes extends styledInterface {
  typo: string;
  userInfo?: string;
  readonly?: boolean;
  isEmail?: boolean;
}

const ProfileListWrap = styled.dl<{ isEmail?: boolean }>`
  display: flex;
  align-items: center;
  dt {
    min-width: 100px;
  }
  dd {
    width: calc(100% - 100px);
    ${(props) =>
      props.isEmail
        ? `
      > div{
        &::after{
          content: "";
          display: inline-block;
          width: 16px;
          height: 16px;
          color: var(--color-point);
          margin-left: 6px;
          vertical-align: text-top;
          background-image: ${svgCheckIcon("40c057")};
        }
      }
    `
        : ``}
  }
`;

const ProfileListComponent: React.FC<ProfileListTypes> = (props) => {
  const { typo, color, userInfo, readonly, isEmail } = props;
  // console.log(userInfo);
  return (
    <ProfileListWrap isEmail={isEmail}>
      <dt>
        <TypoComponent
          fontSize="14px"
          fontWeight="regular"
          textAlign="left"
          color={color}
        >
          {typo}
        </TypoComponent>
      </dt>
      <dd>
        {/* FIXME : input value ? */}
        {readonly ? (
          <TypoComponent
            lineHeight="40px"
            paddingLeft="8px"
            color="var(--color-grey)"
            lineClamp="1"
          >
            {userInfo}
          </TypoComponent>
        ) : (
          <InputText
            type="text"
            placeHolder={`${typo}을 입력해주세요`}
            defaultValue={userInfo}
          />
        )}
      </dd>
    </ProfileListWrap>
  );
};

ProfileListComponent.defaultProps = {};

export default ProfileListComponent;
