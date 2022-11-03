import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface ProfileWordTypes extends styledInterface {
  isOpened: boolean;
}

const ProfileWordWrapStyled = styled.div<ProfileWordTypes>`
  transition-duration: 0.3s;
  overflow: hidden;
  max-height: 0;
  border-top: ${props =>
    props.isOpened ? "1px dashed rgba(120, 120, 120, 0.2);" : "0"};
  /* background-color: #f9f9f9; */
  ${props => (props.isOpened ? 'max-height: 150px' : ``)};
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
