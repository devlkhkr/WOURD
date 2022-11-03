import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface ProfileWordTypes extends styledInterface {
}

const ProfileWordWrapStyled = styled.div<ProfileWordTypes>`

`;

const ProfileWordComponent: React.FC<ProfileWordTypes> = ({
  
}) => {
  return (
    <ProfileWordWrapStyled
    >
      텍스트
    </ProfileWordWrapStyled>
  );
};

ProfileWordComponent.defaultProps = {};

export default ProfileWordComponent;
