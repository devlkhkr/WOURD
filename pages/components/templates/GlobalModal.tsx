import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import Icon from "pages/components/atoms/Icon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DevLog from "pages/components/organisms/DevLog";
import HelpMessage from "../organisms/HelpMessage";
import Notice from "../organisms/Notice";
import SystemSpec from "../organisms/SystemSpec";
import { selectModal, openModal, closeModal } from "redux/slices/modal";
import TypoComponent from "../atoms/Typo";

interface ModalTypes {
  title?: string;
  type: string;
  component: any;
}

const modalStringList = {
  // 공지사항
  NoticeModal: "NoticeModal",
  // 도움말
  HelpMessageModal: "HelpMessageModal",
  // 개발히스토리
  DevLogModal: "DevLogModal",
  // 시스템스펙
  SystemSpecModal: "SystemSpecModal",
};

const modalComponentList: Array<ModalTypes> = [
  {
    title: "공지사항",
    type: modalStringList.NoticeModal,
    component: <Notice />,
  },
  {
    title: "도움말",
    type: modalStringList.HelpMessageModal,
    component: <HelpMessage />,
  },
  {
    title: "개발히스토리",
    type: modalStringList.DevLogModal,
    component: <DevLog />,
  },
  {
    title: "시스템스펙",
    type: modalStringList.SystemSpecModal,
    component: <SystemSpec />,
  },
];

const ModalWrapStyled = styled.div`
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 720px;
  height: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
  animation: popup 0.3s linear;
`;

const CloseModalStyled = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  right: 24px;
  top: 12px;
  position: absolute;
  z-index: 1;
`;

const ModalCardStyled = styled.div`
  width: 100%;
  height: calc(100% - (var(--height-header) + var(--height-footer)));
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.1);
`;

const ModalDetailsStyled = styled.div`
  height: calc(100% - 48px);
  position: relative;
  /* top: 32px; */
  overflow: auto;
  padding: 16px;
`;

const TitModalStyled = styled.div`
  height: 48px;
  padding-left: 16px;
  background-color: var(--color-point);
`;

const GlobalModalComponent: React.FC = () => {
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  if (!isOpen) return <></>;

  const findModal: ModalTypes | undefined = modalComponentList.find((modal) => {
    return modal.type === modalType;
  });

  const getModalTitle = () => {
    if (findModal != undefined) {
      return findModal.title;
    }
  };

  const getModalComponent = () => {
    if (findModal != undefined) {
      return findModal.component;
    }
  };

  return (
    <ModalWrapStyled>
      <ModalCardStyled>
        <TitModalStyled>
          <TypoComponent
            textAlign="left"
            lineHeight="48px"
            color="#fff"
            fontWeight="bold"
          >
            {getModalTitle()}
          </TypoComponent>
        </TitModalStyled>
        <CloseModalStyled onClick={() => dispatch(closeModal())}>
          <Icon
            iconShape={faXmark}
            iconWidth="24px"
            iconHeight="24px"
            svgSize="24px"
            align="auto"
            color="#fff"
          />
        </CloseModalStyled>
        <ModalDetailsStyled>{getModalComponent()}</ModalDetailsStyled>
      </ModalCardStyled>
    </ModalWrapStyled>
  );
};

export default GlobalModalComponent;
