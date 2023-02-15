import React from "react";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
interface ProfileWordTypes extends styledInterface {
  isOpened: boolean;
}

const ProfileWordWrapStyled = styled.ul<ProfileWordTypes>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition-duration: 0.3s;
  overflow: hidden;
  max-height: 0;
  ${(props) =>
    props.isOpened
      ? "max-height: 150px; padding: 8px 0;border-top: 1px dashed rgba(120,120,120,0.2)"
      : ``};
`;

const ProfileWordComponent: React.FC<ProfileWordTypes> = ({
  isOpened,
  children,
}) => {
  return (
    <ProfileWordWrapStyled isOpened={isOpened}>
      {children}
    </ProfileWordWrapStyled>
  );
};

ProfileWordComponent.defaultProps = {};

export default ProfileWordComponent;
