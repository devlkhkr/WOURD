import React, { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
interface CardSwiperTypes {
  children: any;
  className: any;
}

const CardSwiperSyled = styled.div<CardSwiperTypes>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  user-select: none;
`;

const CardSwiperComponent: React.FC<CardSwiperTypes> = ({ children, className }) => {
  let prevPosX = 0;
  let prevPosY = 0;

  const cardMouseDown = function (event: React.TouchEvent | React.MouseEvent) {
    event.persist();
    if (event.nativeEvent instanceof TouchEvent) {
      if (event.nativeEvent.touches.length === 1) {
        prevPosX = event.nativeEvent.touches[0].clientX;
        prevPosY = event.nativeEvent.touches[0].clientY;
        window.addEventListener("touchend", cardMouseUp)
        window.addEventListener("touchmove", cardMouseMove)
      };
    }

    if (event.nativeEvent instanceof MouseEvent) {
      prevPosX = event.nativeEvent.clientX;
      prevPosY = event.nativeEvent.clientY;
      window.addEventListener("mouseup", cardMouseUp)
      window.addEventListener("mousemove", cardMouseMove)
    }
  }

  const cardMouseMove: any = function (event: React.TouchEvent | React.MouseEvent) {
    if (event instanceof TouchEvent) {
      const posX = prevPosX - event.touches[0].clientX;
      const posY = prevPosY - event.touches[0].clientY;
      prevPosX = event.touches[0].clientX;
      prevPosY = event.touches[0].clientY;
      cardDOM.current.style.left = `${cardDOM.current.offsetLeft - posX}px`
      cardDOM.current.style.top = `${cardDOM.current.offsetTop - posY}px`
    }

    if (event instanceof MouseEvent) {
      const posX = prevPosX - event.clientX;
      const posY = prevPosY - event.clientY;
      prevPosX = event.clientX;
      prevPosY = event.clientY;
      cardDOM.current.style.left = `${cardDOM.current.offsetLeft - posX}px`
      cardDOM.current.style.top = `${cardDOM.current.offsetTop - posY}px`
    }
  }

  const cardMouseUp: any = function (event: React.TouchEvent | React.MouseEvent) {
    if (event instanceof TouchEvent) {
      window.removeEventListener("touchend", cardMouseUp)
      window.removeEventListener("touchmove", cardMouseMove)
    }
    if (event instanceof MouseEvent) {
      window.removeEventListener("mouseup", cardMouseUp)
      window.removeEventListener("mousemove", cardMouseMove)
    }
  }

  const cardDOM: any = useRef();
  return (
    <CardSwiperSyled
      ref={cardDOM}
      onMouseDown={cardMouseDown}
      onTouchStart={cardMouseDown}
      className={className}>
      {children}
    </CardSwiperSyled>
  )
};

CardSwiperComponent.defaultProps = {};

export default CardSwiperComponent;
