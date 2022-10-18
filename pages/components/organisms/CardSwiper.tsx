import React, { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
interface CardSwiperTypes {
  children: any;
  className?: any;
  wordInfo: object;
  cardHandler: {
    know: Function;
    dontKnow: Function;
    fav: Function;
    skip: Function;
  };
  setCvrtPntState: Function
}

const CardSwiperSyled = styled.div<CardSwiperTypes>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  user-select: none;
  will-change: left, transform;
  // box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  &.fliped .cardMain {
    transform: rotateY(180deg);
    transition: transform 0.5s;
  }
  &.fliped ~ .btn_wrap_cardctrl {
    opacity: 1;
    pointer-events: all;
  }
  &[class*="state_"] {
    transition-duration: 0.5s;
  }
  &.state_k {
    left: 200% !important;
  }
  &.state_d {
    left: -200% !important;
  }
  &.state_f {
    top: -200% !important;
  }
  &.state_s {
    top: 200% !important;
  }
`;

const CardSwiperComponent: React.FC<CardSwiperTypes> = ({
  children,
  className,
  wordInfo,
  cardHandler,
  setCvrtPntState
}) => {
  const throwLimit = 100;
  let startPointX = 0;
  let startPointY = 0;
  let prevPosX = 0;
  let prevPosY = 0;
  let movedDistanceX;
  let movedDistanceY;

  const cardMouseDown = function (event: React.TouchEvent | React.MouseEvent) {
    event.persist();
    if (event.nativeEvent instanceof TouchEvent) {
      if (event.nativeEvent.touches.length === 1) {
        setStartPoint(
          event.nativeEvent.touches[0].clientX,
          event.nativeEvent.touches[0].clientY
        );
        window.addEventListener("touchend", cardMouseUp);
        window.addEventListener("touchmove", cardMouseMove);
      }
    }

    if (event.nativeEvent instanceof MouseEvent) {
      setStartPoint(event.nativeEvent.clientX, event.nativeEvent.clientY);
      window.addEventListener("mouseup", cardMouseUp);
      window.addEventListener("mousemove", cardMouseMove);
    }
  };

  const setStartPoint = function (_x: number, _y: number) {
    startPointX = _x;
    startPointY = _y;

    prevPosX = _x;
    prevPosY = _y;
  };

  const cardMouseMove: any = function (
    event: React.TouchEvent | React.MouseEvent
  ) {
    if (event instanceof TouchEvent) {
      commonMoveEvent(event.touches[0].clientX, event.touches[0].clientY);
    }

    if (event instanceof MouseEvent) {
      commonMoveEvent(event.clientX, event.clientY);
    }
  };

  const commonMoveEvent = function (_x: number, _y: number) {
    const posX = prevPosX - _x;
    const posY = prevPosY - _y;
    prevPosX = _x;
    prevPosY = _y;
    cardDOM.current.style.left = `${cardDOM.current.offsetLeft - posX}px`;
    cardDOM.current.style.top = `${cardDOM.current.offsetTop - posY}px`;
    cardDOM.current.style.transform = `rotate(${(cardDOM.current.offsetLeft - posX) / 16
      }deg)`;
    if (Math.abs(_x - startPointX) > throwLimit) {
      _x - startPointX > 0
        ? setCvrtPntState("convert_vert convert_k")
        : setCvrtPntState("convert_vert convert_d")
    }
    else if (Math.abs(_y - startPointY) > throwLimit) {
      _y - startPointY > 0
        ? setCvrtPntState("convert_horz convert_s")
        : setCvrtPntState("convert_horz convert_f")
    }
    else {
      setCvrtPntState("")
    }
  };

  const cardMouseUp: any = function (
    event: React.TouchEvent | React.MouseEvent
  ) {
    // cardStateDecided();
    if (event instanceof TouchEvent) {
      commonEndEvent(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );
      window.removeEventListener("touchend", cardMouseUp);
      window.removeEventListener("touchmove", cardMouseMove);
    }
    if (event instanceof MouseEvent) {
      commonEndEvent(event.clientX, event.clientY);
      window.removeEventListener("mouseup", cardMouseUp);
      window.removeEventListener("mousemove", cardMouseMove);
    }
  };

  const commonEndEvent = function (_x: number, _y: number) {
    movedDistanceX = _x - startPointX;
    movedDistanceY = _y - startPointY;
    cardStateDecided(movedDistanceX, movedDistanceY);
  };

  const cardStateDecided = function (_x: number, _y: number) {
    if (Math.abs(_x) < throwLimit && Math.abs(_y) < throwLimit) {
      console.log("none");
      cardDOM.current.style.left = 0;
      cardDOM.current.style.top = 0;
      cardDOM.current.style.transform = "unset";
    }
    if (Math.abs(_x) > throwLimit) {
      _x > 0
        ? cardHandler.know(wordInfo)
        : cardHandler.dontKnow(wordInfo)
      setTimeout(function () {
        cardDOM.current.classList.remove("fliped");
      }, 500);
    }
    if (Math.abs(_y) > throwLimit) {
      _y > 0
        ? cardHandler.skip(wordInfo)
        : cardHandler.fav(wordInfo)
      setTimeout(function () {
        cardDOM.current.classList.remove("fliped");
      }, 500);
    }
  };

  const cardDOM: any = useRef();
  return (
    <CardSwiperSyled
      ref={cardDOM}
      onMouseDown={cardMouseDown}
      onTouchStart={cardMouseDown}
      className={className}
      wordInfo={wordInfo}
      cardHandler={cardHandler}
      setCvrtPntState={setCvrtPntState}
    >
      {children}
    </CardSwiperSyled>
  );
};

CardSwiperComponent.defaultProps = {};

export default CardSwiperComponent;
