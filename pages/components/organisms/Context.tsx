import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";

import uuid from "uuid4";
import { store } from "redux/store";
import { useStore } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  ContextDataTypes,
  setContext,
  clearContext,
} from "redux/slices/context";
import Typo from "../atoms/Typo";
import Mask from "../atoms/Mask";

interface ContextPosTypes {
  ref: any;
  position: {
    x: number;
    y: number;
  };
}

interface ContextListTypes {
  color: string;
}
const ContextWrapStyled = styled.div<ContextPosTypes>`
  position: fixed;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  display: inline-block;
  min-width: 160px;
  height: auto;
  z-index: 19999;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
`;

const ContextListStyled = styled.div<ContextListTypes>`
  color: ${(props) => props.color};
  padding: 12px;
  background-color: #fff;
  & + & {
    border-top: 1px dashed #ddd;
  }
`;

interface ContextActiveTypes {
  active: boolean;
}

const ContextActiveStyled = styled.div<ContextActiveTypes>`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const ContextTitStyled = styled.div`
  background-color: var(--color-black);
  padding: 12px;
`;

export function newContext(context: ContextDataTypes) {
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
  const [context, setContext] = useState<ContextDataTypes>({
    title: "",
    contextList: [
      {
        contextTit: "",
        color: "",
        onClick: () => {},
      },
    ],
    isOpen: false,
    position: {
      x: 0,
      y: 0,
    },
  });
  const refContextWrap = useRef<HTMLDivElement>();

  store.subscribe(() => {
    setContext(store.getState().context);
  });

  useEffect(() => {
    if (refContextWrap.current) {
      let contextPosCond =
        context.position.x + refContextWrap.current.offsetWidth >
        window.innerWidth;
      contextPosCond
        ? (refContextWrap.current.style.left =
            context.position.x - refContextWrap.current.offsetWidth + "px")
        : void 0;
    }
  }, [context]);

  return (
    <ContextActiveStyled active={context.isOpen}>
      <Mask
        onClick={() => {
          store.dispatch(clearContext({}));
        }}
      />
      <ContextWrapStyled position={context.position} ref={refContextWrap}>
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
              onClick={() => {
                list.onClick();
                store.dispatch(clearContext({}));
              }}
            >
              <Typo fontSize="14px">{list.contextTit}</Typo>
            </ContextListStyled>
          );
        })}
      </ContextWrapStyled>
    </ContextActiveStyled>
  );
};

export default ContextComponent;
