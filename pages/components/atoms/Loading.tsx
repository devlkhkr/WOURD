import React from "react";
import styled, { css } from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface LoadingTypes extends styledInterface{

}

const countDominoSegs = 7;

const setDominoTimer = function () {
  let styles = "";

  for (let i = 1; i < (countDominoSegs + 1); i++) {
    styles += `
        &:nth-child(${i}) {
          animation-delay: ${(-0.4 * i)}s;
        }
     `;
  }
  return css`
    ${styles}
  `;
}

const LoadingStyled = styled.div<LoadingTypes>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 20000;

  ul {
    width: 100px;
    height: 30px;
    padding: 0;
    position: relative;
  }

  li {
    position: absolute;
    right: 0;
    width: 3px;
    height: 30px;
    background-color: ${(props) => props.color || "var(--color-point)"};
    display: block;
    border-radius: 3px;
    transform-origin: 50% 100%;
    animation: domino 2.8s linear infinite;
    ${setDominoTimer()};
  }
`;

const LoadingComponent: React.FC<LoadingTypes> = ({
  color,
}) => {
  const createLoadingDomino = function () {
    return (
      <ul>
        {new Array(countDominoSegs).fill(0).map((li, index) => <li key={index}></li>)}
      </ul>
    )
  }
  return (
    <LoadingStyled color={color}>{createLoadingDomino()}</LoadingStyled>
  );
};

LoadingComponent.defaultProps = {};

export default LoadingComponent;
