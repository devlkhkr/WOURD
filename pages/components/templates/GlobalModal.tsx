import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import Icon from "pages/components/atoms/Icon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DevLog from "pages/components/organisms/DevLog";
import { selectModal, openModal, closeModal } from "redux/slices/modal";

interface ModalTypes {
  type: string;
  component: any;
}

const modalStringList = {
  DevLogModal: "DevLogModal",
};

const modalComponentList: Array<ModalTypes> = [
  {
    type: modalStringList.DevLogModal,
    component: <DevLog />,
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
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
  animation: popup 0.3s linear;
`;

const CloseModalStyled = styled.i`
  display: inline-block;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 1;
`;

const ModalCardStyled = styled.div`
  width: 100%;
  height: calc(100% - (var(--height-header) + var(--height-footer)));
  padding: 20px;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  border-radius: 16px;
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
        {getModalComponent()}
      </ModalCardStyled>
    </ModalWrapStyled>
  );
};

export default GlobalModalComponent;
