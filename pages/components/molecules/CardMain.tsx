import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/atoms/Button";
import Typo from "../../components/atoms/Typo";
import { CardSwiper } from "react-card-rotate-swiper";
import { dir } from "console";

interface CardMainTypes {
  exposeWord: ExposeWordTypes[];
}
interface ExposeWordTypes {
  word: string;
  unravel?: string;
  desc: string;
  fliped?: boolean;
}

const CardBaseStyle = `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  padding: 16px;
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
`;

const MainWrapStyled = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .card {
    width: 100%;
    height: calc(100% - 80px);
    position: absolute;
    &.fliped .cardMain {
      transform: rotateY(180deg);
      transition: transform 0.5s;
    }
    &.fliped ~ .btn_wrap_cardctrl {
      opacity: 1;
      pointer-event: all;
    }
  }
`;

const CardWrapStyled = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CardMainStyled = styled.div<CardMainTypes>`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;

  position: absolute;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  transition: transform 0.5s;
  transform-style: preserve-3d;
`;

const CardFrontStyled = styled.div`
  ${CardBaseStyle}
`;

const CardBackStyled = styled.div`
  ${CardBaseStyle}
  transform: rotateY(180deg);
`;

const BtnWrapCardCtrlStyled = styled.div`
  position: absolute;
  bottom: 0;
  opacity: 0;
  pointer-event: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  transition-duration: 0.5s;
  button + button {
    margin-left: 8px;
  }
`;

const CardMainComponent: React.FC<CardMainTypes> = ({ exposeWord }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const cardPrevClick = function () {
    setFlagFlip(false);
    if (wordIdx != 0) setWordIdx(wordIdx - 1);
  };
  const cardNextClick = function () {
    setFlagFlip(false);
    if (wordIdx < exposeWord.length - 1) setWordIdx(wordIdx + 1);
  };

  const [flagFlip, setFlagFlip] = useState(false);
  const [wordList, setWordList] = useState([...exposeWord]);
  return (
    <MainWrapStyled>
      {wordList.map((objWord, index) => (
        <CardSwiper
          key={index}
          onSwipe={function (d: string) {
            switch (d) {
              case "none":
                objWord.fliped = !objWord.fliped;
                setWordList([...wordList]);
                break;
              case "left":
              case "right":
                setTimeout(function () {
                  objWord.fliped = false;
                  setWordList([...wordList]);
                }, 700);
                break;
            }
          }}
          className={`card ${objWord.fliped ? "fliped" : ""}`}
          throwLimit={360}
          contents={
            <CardWrapStyled>
              <CardMainStyled exposeWord={exposeWord} className="cardMain">
                <CardFrontStyled>
                  <div>{objWord.fliped}</div>
                  <Typo type="typo-lg">{objWord.word}</Typo>
                </CardFrontStyled>
                <CardBackStyled>
                  <Typo type="typo-lg">{objWord.word}</Typo>
                  <Typo>{objWord.unravel}</Typo>
                  <Typo>{objWord.desc}</Typo>
                </CardBackStyled>
              </CardMainStyled>
            </CardWrapStyled>
          }
        />
      ))}
      <BtnWrapCardCtrlStyled className="btn_wrap_cardctrl">
        <Button
          desc="이전카드"
          bgc="#666"
          color="#fff"
          width="40%"
          height="40px"
          onClick={cardPrevClick}
        />
        <Button
          desc="다음카드"
          bgc="#666"
          color="#fff"
          width="40%"
          height="40px"
          onClick={cardNextClick}
        />
      </BtnWrapCardCtrlStyled>
    </MainWrapStyled>
  );
};

CardMainComponent.defaultProps = {};

export default CardMainComponent;
