import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";

import uuid from "uuid4";
import { store } from "redux/store";
import { useStore } from "react-redux";
import { useState } from "react";
import {
  ContextDataTypes,
  setContext,
  clearContext,
} from "redux/slices/context";
import Typo from "../atoms/Typo";
import { cardDelOnclick, cardEditOnclick } from "../atoms/ContextFunc";

interface ContextPosTypes {
  position: {
    x: number;
    y: number;
  };
}

interface ContextListTypes {
  color: string;
}

const ContextMaskStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 19998;
`;

const ContextWrapStyled = styled.div<ContextPosTypes>`
  position: fixed;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  display: inline-block;
  min-width: 160px;
  height: auto;
  z-index: 19999;
  background-color: #fff;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 8px 8px;
`;

const ContextListStyled = styled.div<ContextListTypes>`
  color: ${(props) => props.color};
  padding: 12px;
  & + & {
    border-top: 1px dashed #ddd;
  }
`;

const ContextTitStyled = styled.div`
  background-color: var(--color-black);
  padding: 12px;
  border-radius: 8px 8px 0 0;
`;

export function newContext(context: ContextDataTypes) {
  console.log(context);
  store.dispatch(
    setContext({
      title: context.title,
      contextList: context.contextList,
      isOpen: context.isOpen,
      position: context.position,
    })
  );
}

const ContextComponent: React.FC = ({}) => {
  const [context, setContext] = useState<ContextDataTypes>();
  store.subscribe(() => {
    setContext(store.getState().context);
  });

  const getContextPosition = (pos: { x: number; y: number }) => {
    console.log(pos);
    return pos;
  };

  const initContextFunction = (type: string) => {
    switch (type) {
      case "cardEditOnclick":
        cardEditOnclick();
        break;
      case "cardDelOnclick":
        cardDelOnclick();
        break;
      default:
        console.log("Context 매칭 함수 없음");
    }
    return true;
  };

  if (context && context.isOpen) {
    return (
      <>
        <ContextMaskStyled
          onPointerDown={() => {
            store.dispatch(clearContext({}));
          }}
        />
        <ContextWrapStyled position={getContextPosition(context.position)}>
          <ContextTitStyled>
            <Typo fontSize="14px" color="#fff" fontWeight="semi-bold">
              {context.title}
            </Typo>
          </ContextTitStyled>
          {context.contextList.map((list, index) => {
            return (
              <ContextListStyled
                key={index}
                color={list.color}
                onClick={(e) => {
                  initContextFunction(list.onClick);
                }}
              >
                <Typo fontSize="14px">{list.contextTit}</Typo>
              </ContextListStyled>
            );
          })}
        </ContextWrapStyled>
      </>
    );
  } else {
    return <></>;
  }
};

export default ContextComponent;
