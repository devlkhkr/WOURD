import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";

import { clearMsg, RdxMsgTypes, selectAlert, setMsg } from "redux/slices/alert";

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
  z-index: 9999;
  pointer-events: none;
`;

const AlertMsgStyled = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.75);
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

const AlertComponent: React.FC = ({}) => {
  const { msg } = useSelector(selectAlert);
  if (Object.keys(msg).length != 0) {
    return (
      <AlertWrapStyled>
        {Object.entries(msg).map((mIterable: any, index: number) => {
          return <AlertMsgStyled key={index}>{mIterable[1]}</AlertMsgStyled>;
        })}
      </AlertWrapStyled>
    );
  } else {
    return <></>;
  }
};

export default AlertComponent;
