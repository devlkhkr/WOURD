import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { UserData } from "redux/slices/user";

import InputText from "../atoms/InputText";
import TypoComponent from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";

interface ProfileListTypes extends styledInterface {
  typo : string;
}

const ProfileListWrap = styled.dl`
  display : flex;
  align-items : center;
  dt {
    min-width : 80px;
  }
  dd {
    width : calc(100% - 80px);
  }
`

const ProfileListComponent: React.FC<ProfileListTypes> = (props) => {
  const { typo, color } = props;

  const userData = useSelector<ReducerType, UserData[]>(state => state.user);

  console.log(userData[0].id)
  return (
    <ProfileListWrap>
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
        <InputText type="text" placeHolder="이름을 입력해주세요" value={`${userData[0].id}`} />
      </dd>
    </ProfileListWrap>
  );
};

ProfileListComponent.defaultProps = {};

export default ProfileListComponent;
