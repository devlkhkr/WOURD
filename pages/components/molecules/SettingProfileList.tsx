import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";

import InputText from "../atoms/InputText";
import { svgCheckIcon } from "../../../functional/functions/SvgIcons";
import TypoComponent from "../atoms/Typo";
import styledInterface from "../../../functional/intefaces/styledComponent";

interface ProfileListTypes extends styledInterface {
  typo: string;
  userInfo?: string;
  readonly?: boolean;
  isEmail?: boolean;
  onInputChange?: Function;
  maxLength?: number;
  buttonInfo?: {
    label: string;
    onClick: MouseEventHandler;
  };
}

const ProfileListWrap = styled.dl<{ isEmail?: boolean }>`
  display: flex;
  align-items: center;
  dt {
    min-width: 72px;
  }
  dd {
    display: flex;
    width: calc(100% - 72px);
    button {
      margin-left: 8px;
    }
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
  const {
    typo,
    color,
    userInfo,
    readonly,
    isEmail,
    onInputChange,
    maxLength,
    buttonInfo,
  } = props;
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
        {isEmail ? (
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
            onChange={onInputChange}
            maxLength={maxLength}
            readonly={readonly}
          />
        )}
        {buttonInfo ? (
          <Button
            type="button"
            width="140px"
            desc={buttonInfo.label}
            onClick={buttonInfo.onClick}
            disabled={readonly}
            backgroundColor="var(--color-point)"
            color="#fff"
          />
        ) : (
          <></>
        )}
      </dd>
    </ProfileListWrap>
  );
};

ProfileListComponent.defaultProps = {};

export default ProfileListComponent;
