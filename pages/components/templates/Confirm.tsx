import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
import Icon from "pages/components/atoms/Icon";
import {
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import DevLog from "pages/components/organisms/DevLog";
import HelpMessage from "../organisms/HelpMessage";
import Notice from "../organisms/Notice";
import SystemSpec from "../organisms/SystemSpec";
import TypoComponent from "../atoms/Typo";
import Donation from "../organisms/Donation";
import {
  selectConfirm,
  setConfirm,
  closeConfirm,
  ConfirmDataTypes,
} from "redux/slices/confirm";
import { useEffect, useState } from "react";
import { store } from "redux/store";
import ButtonCompontent from "../atoms/Button";
import Mask from "../atoms/Mask";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const ConfirmWrapStyled = styled.div`
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
  z-index: 1;
  animation: popup 0.3s linear;
  z-index: 19999;
`;

const CloseConfirmStyled = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  right: 24px;
  top: 12px;
  position: absolute;
  z-index: 1;
`;

const ConfirmCardStyled = styled.div`
  width: 320px;
  max-width: 100%;
  height: auto;
  position: relative;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.1);
  z-index: 19999;
`;

const ConfirmDetailsStyled = styled.div`
  height: calc(100% - 48px);
  position: relative;
  overflow: auto;
  padding: 16px;
`;

const TitConfirmStyled = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding-left: 16px;
  background-color: #555;
  i {
    margin-right: 8px;
  }
`;

const ConfirmButtonsStyled = styled.div`
  display: flex;
  margin-top: 16px;
  button + button {
    margin-left: 8px;
  }
`;

const ConfirmTextStyled = styled.div`
  padding: 16px 0;
`;

export function newConfirm(confirm: ConfirmDataTypes) {
  store.dispatch(
    setConfirm({
      submitTit: confirm.submitTit,
      confirmSubmit: confirm.confirmSubmit,
      confirmText: confirm.confirmText,
      isOpen: true,
    })
  );
}

const ConfirmComponent: React.FC = () => {
  const [confirm, setConfirm] = useState<ConfirmDataTypes>({
    confirmSubmit: () => {},
    submitTit: "",
    confirmText: "",
    isOpen: false,
  });

  store.subscribe(() => {
    setConfirm(store.getState().confirm);
  });

  if (!confirm.isOpen) return <></>;

  return (
    <ConfirmWrapStyled>
      <Mask />
      <ConfirmCardStyled>
        <TitConfirmStyled>
          <Icon
            iconShape={faBell}
            iconWidth="14px"
            iconHeight="14px"
            color="#fff"
          />
          <TypoComponent
            textAlign="left"
            lineHeight="48px"
            color="#fff"
            fontWeight="bold"
          >
            알림
          </TypoComponent>
        </TitConfirmStyled>
        <CloseConfirmStyled onClick={() => store.dispatch(closeConfirm())}>
          <Icon
            iconShape={faXmark}
            iconWidth="24px"
            iconHeight="24px"
            svgSize="24px"
            align="auto"
            color="#fff"
          />
        </CloseConfirmStyled>
        <ConfirmDetailsStyled>
          <ConfirmTextStyled>
            <TypoComponent fontSize="14px" textAlign="center">
              {confirm.confirmText}
            </TypoComponent>
          </ConfirmTextStyled>
          <ConfirmButtonsStyled>
            <ButtonCompontent
              desc="취소"
              height="40px"
              color="var(--color-black)"
              onClick={() => store.dispatch(closeConfirm())}
            />
            <ButtonCompontent
              desc={confirm.submitTit || "확인"}
              height="40px"
              backgroundColor="var(--color-point)"
              color="#fff"
              onClick={() => {
                confirm.confirmSubmit();
              }}
            />
          </ConfirmButtonsStyled>
        </ConfirmDetailsStyled>
      </ConfirmCardStyled>
    </ConfirmWrapStyled>
  );
};

export default ConfirmComponent;
