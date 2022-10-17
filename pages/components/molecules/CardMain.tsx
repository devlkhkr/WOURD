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

const CardMainComponent: React.FC<CardMainTypes> = ({ exposeWord }) => {
  const cardList: any = useRef();

  const handleClickDontKnow = function (_objWord: ExposeWordTypes, e: Event) {
    _objWord.state = "state_d";
    setWordList([...wordList]);
  };
  const handleClickKnow = function (_objWord: ExposeWordTypes, e: Event) {
    _objWord.state = "state_k";
    setWordList([...wordList]);
  };
  const handleClickFav = function (_objWord: ExposeWordTypes, e: Event) {
    _objWord.state = "state_f";
    setWordList([...wordList]);
  };
  const handleClickSkip = function (_objWord: ExposeWordTypes, e: Event) {
    _objWord.state = "state_s";
    setWordList([...wordList]);
  };

  const cardOnClick = function (_objWord: ExposeWordTypes, e: any) {
    // _objWord.fliped = !_objWord.fliped;
    _objWord.fliped = true;
    setWordList([...wordList]);
  };

  const [wordList, setWordList] = useState([...exposeWord]);
  return (
    <MainWrapStyled ref={cardList}>
      {wordList.reverse().map((objWord, index) => (
        <CardSwiper
          key={index}
          className={`card ${objWord.fliped ? "fliped" : ""} ${objWord.state}`}
          state={objWord.state}
        >
          <CardWrapStyled
            onMouseDown={(e) => {
              cardOnClick(objWord, e);
            }}
            onTouchStart={(e) => {
              cardOnClick(objWord, e);
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
          <BtnWrapCardCtrlStyled className="btn_wrap_cardctrl">
            <Button
              desc="건너뛰기"
              bgc="#92a4c9"
              color="#fff"
              width="40%"
              height="40px"
              onClick={(e: any) => {
                handleClickSkip(objWord, e);
              }}
            />
            <Button
              desc="즐겨찾기"
              bgc="#92a4c9"
              color="#fff"
              width="40%"
              height="40px"
              onClick={(e: any) => {
                handleClickFav(objWord, e);
              }}
            />
            <Button
              desc="모르는단어"
              bgc="#92a4c9"
              color="#fff"
              width="40%"
              height="40px"
              onClick={(e: any) => {
                handleClickDontKnow(objWord, e);
              }}
            />
            <Button
              desc="아는단어"
              bgc="#92a4c9"
              color="#fff"
              width="40%"
              height="40px"
              onClick={(e: any) => {
                handleClickKnow(objWord, e);
              }}
            />
          </BtnWrapCardCtrlStyled>
        </CardSwiper>
      ))}
    </MainWrapStyled>
  );
};

CardMainComponent.defaultProps = {};

export default CardMainComponent;
