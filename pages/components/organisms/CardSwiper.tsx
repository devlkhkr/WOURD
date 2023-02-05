import React, { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
interface CardSwiperTypes {
  children: React.ReactNode;
  className?: any;
  wordInfo: object;
  cardHandler: {
    know: Function;
    dontKnow: Function;
    fav: Function;
    skip: Function;
  };
  setButtonState: Function;
  zIndex: number;
}

const CardSwiperSyled = styled.div<CardSwiperTypes>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  user-select: none;
  will-change: left, transform;
  z-index: ${(props) => props.zIndex || "inherit"};
  /* opacity: 0;
  &.first {
    opacity: 1;
  } */
  &.fliped,
  &[class*="state_"] {
    .cardMain {
      transform: rotateY(180deg);
      transition: transform 0.5s;
    }
  }
  &.fliped {
    & ~ .btn_wrap_cardctrl {
      transition-duration: 0.5s;
      opacity: 1;
      pointer-events: all;
    }
  }
  &[class*="state_"] {
    transition-duration: 0.5s;
    pointer-events: none;
  }
  &.state_ {
    &k {
      left: 200% !important;
    }
    &d {
      left: -200% !important;
    }
    &f {
      top: -200% !important;
    }
    &s {
      top: 200% !important;
    }
  }
`;

const CardSwiperComponent: React.FC<CardSwiperTypes> = ({
  children,
  className,
  wordInfo,
  cardHandler,
  setButtonState,
  zIndex,
}) => {
  const throwLimit = 60;
  let startPointX = 0;
  let startPointY = 0;
  let prevPosX = 0;
  let prevPosY = 0;
  let movedDistanceX;
  let movedDistanceY;

  const cardPointerDown = function (event: React.PointerEvent) {
    event.persist();
    setStartPoint(event.nativeEvent.clientX, event.nativeEvent.clientY);
    window.addEventListener("pointerup", cardMouseUp);
    window.addEventListener("pointermove", cardMouseMove);
  };

  const setStartPoint = function (_x: number, _y: number) {
    startPointX = _x;
    startPointY = _y;

    prevPosX = _x;
    prevPosY = _y;
  };

  const cardMouseMove: any = function (event: React.PointerEvent) {
    cardPointerMove(event.clientX, event.clientY);
  };

  const cardPointerMove = function (_x: number, _y: number) {
    const posX = prevPosX - _x;
    const posY = prevPosY - _y;
    prevPosX = _x;
    prevPosY = _y;
    cardDOM.current.style.left = `${cardDOM.current.offsetLeft - posX}px`;
    cardDOM.current.style.top = `${cardDOM.current.offsetTop - posY}px`;
    cardDOM.current.style.transform = `rotate(${
      (cardDOM.current.offsetLeft - posX) / 16
    }deg)`;

    // console.log(cardDOM.current.offsetLeft);
    // cardDOM.current.previousSibling.style.opacity =
    //   cardDOM.current.offsetLeft - posX / 16;

    let movedDistanceX = Math.abs(_x - startPointX);
    let movedDistanceY = Math.abs(_y - startPointY);

    if (
      Math.abs(_x - startPointX) > throwLimit &&
      movedDistanceX > movedDistanceY
    ) {
      _x - startPointX > 0
        ? setButtonState("focused_k")
        : setButtonState("focused_d");
    } else if (
      Math.abs(_y - startPointY) > throwLimit &&
      movedDistanceY > movedDistanceX
    ) {
      _y - startPointY > 0
        ? setButtonState("focused_s")
        : setButtonState("focused_f");
    } else {
      setButtonState("");
    }
  };

  const cardMouseUp: any = function (event: React.PointerEvent) {
    cardPointerUp(event.clientX, event.clientY);
    window.removeEventListener("pointerup", cardMouseUp);
    window.removeEventListener("pointermove", cardMouseMove);
  };

  const cardPointerUp = function (_x: number, _y: number) {
    movedDistanceX = _x - startPointX;
    movedDistanceY = _y - startPointY;
    cardStateDecided(movedDistanceX, movedDistanceY);
  };

  const cardStateDecided = function (_x: number, _y: number) {
    let absX = Math.abs(_x);
    let absY = Math.abs(_y);
    if (absX < throwLimit && absY < throwLimit) {
      cardDOM.current.style.left = 0;
      cardDOM.current.style.top = 0;
      cardDOM.current.style.transform = "unset";
    }
    if (absX > throwLimit && absX > absY) {
      _x > 0 ? cardHandler.know(wordInfo) : cardHandler.dontKnow(wordInfo);
    } else if (absY > throwLimit && absY > absX) {
      _y > 0 ? cardHandler.skip(wordInfo) : cardHandler.fav(wordInfo);
    }
  };

  const cardDOM: any = useRef();
  return (
    <CardSwiperSyled
      ref={cardDOM}
      onPointerDown={cardPointerDown}
      className={className}
      wordInfo={wordInfo}
      cardHandler={cardHandler}
      setButtonState={setButtonState}
      zIndex={zIndex}
    >
      {children}
    </CardSwiperSyled>
  );
};

CardSwiperComponent.defaultProps = {};

export default CardSwiperComponent;
