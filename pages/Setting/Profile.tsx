import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";

import ImgComponent from "pages/components/atoms/Img";
import TypoComponent from "pages/components/atoms/Typo";
import ProfileListComponent from "pages/components/molecules/SettingProfileList";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { UserData } from "redux/slices/user";

interface SettingProfileTypes extends styledInterface {}

interface AcrdListTypes {}

const SettingProfileComponent: React.FC<SettingProfileTypes> = () => {
  const userData = useSelector<ReducerType, UserData[]>(state => state.user);

  const SettingProfileWrap = styled.div`
    background-color: var(--color-white);
    border-radius: 16px;
    padding: 16px 16px 40px;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  `;

  const SettingProfileUser = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  // FIXME: 이미지 수정할수있는 함수
  const modifyImg = () => {
    console.log("이미지 수정 함수");
  };

  return (
    <SettingProfileWrap>
      <SettingProfileUser>
        <ImgComponent
          src={userData[0].prfImg}
          objectFit="cover"
          marginBottom="16px"
          width="80px"
          height="80px"
        />
        {/* FIXME: 추후 버튼으로 바꾸어야할까요? */}
        <TypoComponent
          fontSize="16px"
          fontWeight="semi-bold"
          textAlign="left"
          color="var(--color-point)"
          onClick={modifyImg}
        >
          프로필 사진 바꾸기
        </TypoComponent>
      </SettingProfileUser>

      <ProfileListComponent typo="이름" />
    </SettingProfileWrap>
  );
};

export default SettingProfileComponent;
