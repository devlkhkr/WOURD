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

interface ModalTypes {
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
    type: modalStringList.NoticeModal,
    component: <Notice />,
  },
  {
    type: modalStringList.HelpMessageModal,
    component: <HelpMessage />,
  },
  {
    type: modalStringList.DevLogModal,
    component: <DevLog />,
  },
  {
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
  width: 24px;
  height: 24px;
  right: 16px;
  top: 16px;
  position: absolute;
  z-index: 1;
`;

const ModalCardStyled = styled.div`
  width: 100%;
  height: calc(100% - (var(--height-header) + var(--height-footer)));
  padding: 16px;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.1);
`;

const ModalDetailsStyled = styled.div`
  height: calc(100% - 32px);
  position: relative;
  top: 32px;
  overflow: auto;
`;

const GlobalModalComponent: React.FC = () => {
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  if (!isOpen) return <></>;

  const findModal: ModalTypes | undefined = modalComponentList.find((modal) => {
    return modal.type === modalType;
  });

  const getModalComponent = () => {
    if (findModal != undefined) {
      return findModal.component;
    }
  };

  return (
    <ModalWrapStyled>
      <ModalCardStyled>
        <CloseModalStyled onClick={() => dispatch(closeModal())}>
          <Icon
            iconShape={faXmark}
            iconWidth="24px"
            iconHeight="24px"
            svgSize="24px"
            align="auto"
            color="var(--color-black)"
          />
        </CloseModalStyled>
        <ModalDetailsStyled>{getModalComponent()}</ModalDetailsStyled>
      </ModalCardStyled>
    </ModalWrapStyled>
  );
};

export default GlobalModalComponent;
