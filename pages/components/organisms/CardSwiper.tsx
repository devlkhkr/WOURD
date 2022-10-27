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
  setButtonState: Function;
}

const CardSwiperSyled = styled.div<CardSwiperTypes>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  user-select: none;
  will-change: left, transform;
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
      /* pointer-events: all; */
    }
  }
  &[class*="state_"] {
    transition-duration: 0.5s;
    /* pointer-events: none; */
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
}) => {
  const throwLimit = 60;
  let startPointX = 0;
  let startPointY = 0;
  let prevPosX = 0;
  let prevPosY = 0;
  let movedDistanceX;
  let movedDistanceY;

  const [cardMoveable, setCardMoveable] = useState(false);

  const cardMouseDown = function (event: React.PointerEvent) {
    setCardMoveable(true)
    event.persist();
    // if (event.nativeEvent instanceof TouchEvent) {
    //   if (event.nativeEvent.touches.length === 1) {
    //     setStartPoint(
    //       event.nativeEvent.touches[0].clientX,
    //       event.nativeEvent.touches[0].clientY
    //     );
    //     window.addEventListener("touchend", cardMouseUp);
    //     window.addEventListener("touchmove", cardMouseMove);
    //   }
    // }

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

  const cardMouseMove: any = function (
    event: React.PointerEvent
  ) {
    // if (event instanceof TouchEvent) {
    //   commonMoveEvent(event.touches[0].clientX, event.touches[0].clientY);
    // }
    console.log(event)
    commonMoveEvent(event.clientX, event.clientY);
  };

  const commonMoveEvent = function (_x: number, _y: number) {
    if(cardMoveable) {
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
          ? setButtonState("focused_k")
          : setButtonState("focused_d");
      } else if (Math.abs(_y - startPointY) > throwLimit) {
        _y - startPointY > 0
          ? setButtonState("focused_s")
          : setButtonState("focused_f");
      } else {
        setButtonState("");
      }
    }
  };

  const cardMouseUp: any = function (
    event: React.PointerEvent
  ) {
    // cardStateDecided();
    // if (event instanceof TouchEvent) {
    //   commonEndEvent(
    //     event.changedTouches[0].clientX,
    //     event.changedTouches[0].clientY
    //   );
    //   window.removeEventListener("touchend", cardMouseUp);
    //   window.removeEventListener("touchmove", cardMouseMove);
    // }
      commonEndEvent(event.clientX, event.clientY);
      window.removeEventListener("pointerup", cardMouseUp);
      setCardMoveable(false);
      window.removeEventListener("pointermove", cardMouseMove);
  };

  const commonEndEvent = function (_x: number, _y: number) {
    movedDistanceX = _x - startPointX;
    movedDistanceY = _y - startPointY;
    cardStateDecided(movedDistanceX, movedDistanceY);
  };

  const cardStateDecided = function (_x: number, _y: number) {
    if (Math.abs(_x) < throwLimit && Math.abs(_y) < throwLimit) {
      cardDOM.current.style.left = 0;
      cardDOM.current.style.top = 0;
      cardDOM.current.style.transform = "unset";
    }
    if (Math.abs(_x) > throwLimit) {
      _x > 0 ? cardHandler.know(wordInfo) : cardHandler.dontKnow(wordInfo);
    }
    if (Math.abs(_y) > throwLimit) {
      _y > 0 ? cardHandler.skip(wordInfo) : cardHandler.fav(wordInfo);
    }
  };

  const cardDOM: any = useRef();
  return (
    <CardSwiperSyled
      ref={cardDOM}
      // onMouseDown={cardMouseDown}
      // onTouchStart={cardMouseDown}
      onPointerDown={cardMouseDown}
      className={className}
      wordInfo={wordInfo}
      cardHandler={cardHandler}
      setButtonState={setButtonState}
    >
      {children}
    </CardSwiperSyled>
  );
};

CardSwiperComponent.defaultProps = {};

export default CardSwiperComponent;
