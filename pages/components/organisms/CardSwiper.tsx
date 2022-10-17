import React from "react";
import styled from "styled-components";
interface CardSwiperTypes {
  children: any;
}

const CardSwiperSyled = styled.form<CardSwiperTypes>`
  
`;

const CardSwiperComponent: React.FC<CardSwiperTypes> = ({ children }) => {
  return <CardSwiperSyled>{children}</CardSwiperSyled>;
};

CardSwiperComponent.defaultProps = {};

export default CardSwiperComponent;
