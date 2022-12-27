import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";

import { clearMsg, selectAlert, setMsg } from "redux/slices/alert";
import { useEffect, useState } from "react";

interface AlertTypes {
  msg: string[];
  isEmpty: boolean;
}

const AlertWrapStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  /* pointer-events: none; */
  span {
    padding: 24px;
    background-color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
  }
`;

const GlobalModalComponent: React.FC = () => {
  const { msg, isEmpty } = useSelector(selectAlert);
  const [allMsg, setAllMsg] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    newAlert("테스트입니다");
  }, []);

  const newAlert = (msg: string) => {
    dispatch(
      setMsg({
        msg: msg,
      })
    );
    setTimeout(() => {
      dispatch(
        clearMsg({
          msg: msg,
        })
      );
    }, 2000);
  };

  return (
    <AlertWrapStyled>
      {msg.map((text: string, index: number) => {
        <span key={index}>
          <div>{text}</div>
        </span>;
      })}
    </AlertWrapStyled>
  );
};

export default GlobalModalComponent;
