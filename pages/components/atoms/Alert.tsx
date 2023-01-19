import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";

import { clearMsg, RdxMsgTypes, selectAlert, setMsg } from "redux/slices/alert";
import uuid from "uuid4";
import { store } from "redux/store";
import { useStore } from "react-redux";
import { useState } from "react";

interface AlertMsgTypes {
  state?: string;
}

const AlertWrapStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: calc(100% - var(--height-header) - var(--height-footer));
  top: var(--height-header);
  padding: 24px;
  display: flex;
  flex-flow: column-reverse;
  align-items: center;
  justify-content: end;
  z-index: 20000;
  pointer-events: none;
`;

const AlertMsgStyled = styled.div<AlertMsgTypes>`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${(props) =>
    props.state === "pstv"
      ? "rgba(20, 136, 190, 0.75)"
      : "rgba(240, 130, 142, 0.75)"};
  color: #fff;
  font-size: 12px;
  border-radius: 8px;
  animation: popup 0.3s ease-in;
  &.fold {
    max-height: 0;
  }
  & + & {
    margin-bottom: 8px;
  }
`;

export function newAlert(text: string, state: string) {
  const msgId = uuid();
  store.dispatch(setMsg({ msg: { text: text, id: msgId, state: state } }));
  setTimeout(() => {
    store.dispatch(clearMsg({ msg: { id: msgId } }));
  }, 2500);
}

const AlertComponent: React.FC = ({}) => {
  const [msg, setMsg] = useState({});
  store.subscribe(() => {
    setMsg(store.getState().alert.msg);
  });
  //   const { msg } = useSelector(selectAlert);
  if (Object.keys(msg).length != 0) {
    return (
      <AlertWrapStyled>
        {Object.entries(msg).map((mIterable: any, index: number) => {
          return (
            <AlertMsgStyled key={index} state={mIterable[1].state}>
              {mIterable[1].text}
            </AlertMsgStyled>
          );
        })}
      </AlertWrapStyled>
    );
  } else {
    return <></>;
  }
};

export default AlertComponent;
