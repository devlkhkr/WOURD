import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Button from "../../components/atoms/Button";
import Typo from "../../components/atoms/Typo";
import CardSwiper from "../../components/organisms/CardSwiper";
import styledInterface from "../Intefaces/styledComponent";
interface CardMainTypes {
  exposeWord: ExposeWordTypes[];
}
interface ExposeWordTypes {

  word_desc?: string;
  word_id?: string;
  word_name?: string;
  word_reg_date?: Date;
  word_reg_userid?: string;
  word_seq?: number;
  word_unravel?: string;

  fliped?: boolean;
  state?: string;
}

const CardBaseStyle = `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  padding: 16px 16px 80px;
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
  border-radius: 16px;
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
  border-radius: 16px;
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
  background: linear-gradient(#3f88ef, #0047ab);
  color: #fff;
  > div {
    & + div {
      margin-top: 4px;
    }
  }
`;

const setButtonPosition: Function = function () {
  let styles = "";

  for (let i = 1; i < 5; i++) {
    styles += `
        &:nth-child(${i}){
          left: calc(${(i - 1) * 25}% + 2px);
        }
     `;
  }
  return css`
    ${styles}
  `;
};

const setButtonFocus: Function = function (color: string) {
  return css`
    z-index: 1;
    opacity: 1;
    background-color: ${color};
  `;
};

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
  button {
    position: absolute;
    max-width: calc(25% - 4px);
    font-size: 12px;
    transition-duration: 0.3s;
    will-change: left opacity;
    ${setButtonPosition()};
  }
  &[class*="focused_"] {
    button {
      opacity: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  &.focused_ {
    &k {
      .btn_word_k {
        ${setButtonFocus("#94be88")}
      }
    }
    &d {
      .btn_word_d {
        ${setButtonFocus("#da8484")}
      }
    }
    &f {
      .btn_word_f {
        ${setButtonFocus("#c8be51")}
      }
    }
    &s {
      .btn_word_s {
        ${setButtonFocus("#bb88be")}
      }
    }
  }
`;

const CardMainComponent: React.FC<CardMainTypes> = ({ exposeWord }) => {
  const cardList: any = useRef();
  const cardHandler = {
    dontKnow: function (_objWord: ExposeWordTypes, e: Event) {
      afterCardHandler(_objWord, "d");
    },
    know: function (_objWord: ExposeWordTypes, e: Event) {
      afterCardHandler(_objWord, "k");
    },
    fav: function (_objWord: ExposeWordTypes, e: Event) {
      afterCardHandler(_objWord, "f");
    },
    skip: function (_objWord: ExposeWordTypes, e: Event) {
      afterCardHandler(_objWord, "s");
    },
  };

  const afterCardHandler = function (_objWord: ExposeWordTypes, state: string) {
    setButtonState("");
    _objWord.fliped = false;
    _objWord.state = `state_${state}`;
    setWordList([...wordList]);
  };

  const setCardFlip = function (_objWord: ExposeWordTypes, e: any) {
    // _objWord.fliped = !_objWord.fliped;
    _objWord.fliped = true;
    setWordList([...wordList]);
  };

  useEffect(() => {
    setWordList([...exposeWord].reverse())
  }, [exposeWord])

  const [wordList, setWordList] = useState<ExposeWordTypes[]>([]);
  console.log(wordList)
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [buttonState, setButtonState] = useState("");
  return (
    <>
      <MainWrapStyled ref={cardList}>
        {wordList.map((objWord:any, index:any) => (
          <CardSwiper
            key={objWord.word_seq}
            className={`card ${objWord.fliped ? "fliped" : ""} ${
              objWord.state || ""
            }`}
            wordInfo={objWord}
            cardHandler={cardHandler}
            setButtonState={setButtonState}
          >
            <CardWrapStyled
              onMouseDown={e => {
                setCardFlip(objWord, e);
                setCurrentCardIdx(index);
              }}
              onTouchStart={e => {
                setCardFlip(objWord, e);
                setCurrentCardIdx(index);
              }}
            >
              <CardMainStyled exposeWord={exposeWord} className="cardMain">
                <CardFrontStyled>
                  <Typo fontSize="24px" fontWeight="bold">
                    {objWord.word_name}
                  </Typo>
                </CardFrontStyled>
                <CardBackStyled>
                  <Typo fontSize="24px" fontWeight="bold">
                    {objWord.word_name}
                  </Typo>
                  <Typo fontSize="16px" fontWeight="semi-bold">
                    {objWord.word_unravel}
                  </Typo>
                  <Typo fontSize="14px" fontWeight="regular" textAlign="left">
                    {objWord.word_desc}
                  </Typo>
                </CardBackStyled>
              </CardMainStyled>
            </CardWrapStyled>
          </CardSwiper>
        ))}
        <BtnWrapCardCtrlStyled className={`btn_wrap_cardctrl ${buttonState}`}>
          <Button
            desc="건너뛰기"
            backgroundColor="#92a4c9"
            color="#fff"
            height="40px"
            className="btn_word_s"
            onClick={(e: any) => {
              cardHandler.skip(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="즐겨찾기"
            backgroundColor="#92a4c9"
            color="#fff"
            height="40px"
            className="btn_word_f"
            onClick={(e: any) => {
              cardHandler.fav(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="모르는단어"
            backgroundColor="#92a4c9"
            color="#fff"
            height="40px"
            className="btn_word_d"
            onClick={(e: any) => {
              cardHandler.dontKnow(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="아는단어"
            backgroundColor="#92a4c9"
            color="#fff"
            height="40px"
            className="btn_word_k"
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
