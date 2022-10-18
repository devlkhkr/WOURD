import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "../../components/atoms/Button";
import Typo from "../../components/atoms/Typo";
import CardSwiper from "../../components/organisms/CardSwiper";

interface CardMainTypes {
  exposeWord: ExposeWordTypes[];
}
interface ExposeWordTypes {
  word: string;
  unravel?: string;
  desc: string;
  fliped: boolean;
  state: string;
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
  border-radius: 8px;
`;

const MainWrapStyled = styled.div<any>`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CardWrapStyled = styled.div`
  width: 100%;
  height: 100%;
  perspective: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CardMainStyled = styled.div<CardMainTypes>`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  transition: transform 0.5s;
  transform-style: preserve-3d;
`;

const CardFrontStyled = styled.div`
  ${CardBaseStyle}
  background-color: #fff;
`;

const CardBackStyled = styled.div`
  ${CardBaseStyle}
  transform: rotateY(180deg);
  background-color: #0047ab;
  color: #fff;
`;

const BtnWrapCardCtrlStyled = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  opacity: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 32px);
  height: 80px;
  transition-duration: 0.5s;
  button + button {
    margin-left: 8px;
  }
`;

const ConvertPointStyled = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  will-change: width height;
  &[class*="convert_"]{
    opacity: .35;
  }
  &.convert_vert{
    width: 50%;
    height: calc(100% - var(--height-header) - var(--height-footer));
    top: var(--height-header);
    &.convert_k{
      right: 0;
      background: linear-gradient(90deg, transparent 0%, #00ffff 100%);
    }
    &.convert_d{
      left: 0;
      background: linear-gradient(90deg, #ffff00 0%, transparent 100%);
    }
  }
  &.convert_horz{
    width: 100%;
    height: 25%;
    left: 0;
    &.convert_f{
      top: var(--height-header);
      background: linear-gradient(0deg, transparent 0%, #009821 100%);
    }
    &.convert_s{
      bottom: var(--height-footer);
      background: linear-gradient(0deg, #e51937 0%, transparent 100%);
    }
  }
`

const CardMainComponent: React.FC<CardMainTypes> = ({ exposeWord }) => {
  const cardList: any = useRef();

  const cardHandler = {
    dontKnow: function (_objWord: ExposeWordTypes, e: Event) {
      afterCardHandler(_objWord, "d")
    },
    know: function (_objWord: ExposeWordTypes, e: Event) {
      afterCardHandler(_objWord, "k")
    },
    fav: function (_objWord: ExposeWordTypes, e: Event) {
      afterCardHandler(_objWord, "f")
    },
    skip: function (_objWord: ExposeWordTypes, e: Event) {
      afterCardHandler(_objWord, "s")
    }
  }

  const afterCardHandler = function (_objWord: ExposeWordTypes, state: string) {
    setCvrtPntState("")
    _objWord.state = `state_${state}`;
    setWordList([...wordList]);
  }

  const setCardFlip = function (_objWord: ExposeWordTypes, e: any) {
    // _objWord.fliped = !_objWord.fliped;
    _objWord.fliped = true;
    setWordList([...wordList]);
  };

  const [wordList, setWordList] = useState([...exposeWord]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [cvrtPntState, setCvrtPntState] = useState("")
  return (
    <>
      <ConvertPointStyled className={cvrtPntState} />
      <MainWrapStyled ref={cardList}>
        {wordList.reverse().map((objWord, index) => (
          <CardSwiper
            key={index}
            className={`card ${objWord.fliped ? "fliped" : ""} ${objWord.state}`}
            wordInfo={objWord}
            cardHandler={cardHandler}
            setCvrtPntState={setCvrtPntState}
          >
            <CardWrapStyled
              onMouseDown={(e) => {
                setCardFlip(objWord, e);
                setCurrentCardIdx(index)
              }}
              onTouchStart={(e) => {
                setCardFlip(objWord, e);
                setCurrentCardIdx(index)
              }}
            >
              <CardMainStyled exposeWord={exposeWord} className="cardMain">
                <CardFrontStyled>
                  <Typo type="typo-lg">{objWord.word}</Typo>
                </CardFrontStyled>
                <CardBackStyled>
                  <Typo type="typo-lg">{objWord.word}</Typo>
                  <Typo>{objWord.unravel}</Typo>
                  <Typo>{objWord.desc}</Typo>
                </CardBackStyled>
              </CardMainStyled>
            </CardWrapStyled>
          </CardSwiper>
        ))}
        <BtnWrapCardCtrlStyled className="btn_wrap_cardctrl">
          <Button
            desc="건너뛰기"
            bgc="#92a4c9"
            color="#fff"
            width="40%"
            height="40px"
            onClick={(e: any) => {
              cardHandler.skip(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="즐겨찾기"
            bgc="#92a4c9"
            color="#fff"
            width="40%"
            height="40px"
            onClick={(e: any) => {
              cardHandler.fav(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="모르는단어"
            bgc="#92a4c9"
            color="#fff"
            width="40%"
            height="40px"
            onClick={(e: any) => {
              cardHandler.dontKnow(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="아는단어"
            bgc="#92a4c9"
            color="#fff"
            width="40%"
            height="40px"
            onClick={(e: any) => {
              cardHandler.know(wordList[currentCardIdx], e);
            }}
          />
        </BtnWrapCardCtrlStyled>
      </MainWrapStyled>
    </>
  );
};

CardMainComponent.defaultProps = {};

export default CardMainComponent;
