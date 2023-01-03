import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Button from "../atoms/Button";
import Typo from "../atoms/Typo";

import Icon from "pages/components/atoms/Icon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import CardSwiper from "../organisms/CardSwiper";
import styledInterface from "../Intefaces/styledComponent";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { UserDataTypes } from "redux/slices/user";
import { useSession } from "next-auth/react";
import DataEmptyComponent from "../molecules/DataEmpty";
import { useRouter } from "next/router";
import { newAlert } from "../atoms/Alert";

interface CardMainTypes {
  exposeWord: ExposeWordTypes[];
  isMyWord?: boolean;
  closeCardModal?: Function;
  afterMyWordState?: Function;
}
export interface ExposeWordTypes {
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
  touch-action: none;
  animation: popup 0.3s linear;
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
  &.state {
    &_k {
      background: linear-gradient(#80d069, #38991c);
    }
    &_d {
      background: linear-gradient(#dc6b6b, #c72f2f);
    }
    &_f {
      background: linear-gradient(#d5cd4d, #a8a023);
    }
    &_s {
    }
  }
  > div {
    & + div {
      margin-top: 4px;
    }
  }
`;

const CardEndStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-size: 14px;
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
        ${setButtonFocus("#98c97b")}
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

const ButtonCardClose = styled.i`
  display: inline-block;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 1;
`;

const WordCateListStyled = styled.div`
  margin-bottom: 6px;
  span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    & + span {
      &::before {
        content: "";
        display: inline-block;
        width: 1px;
        height: 9px;
        background-color: rgba(255, 255, 255, 0.15);
        margin: 0 8px;
      }
    }
  }
`;

const WordRegInfoStyled = styled.div`
  display: inline-block;
  position: absolute;
  left: 16px;
  top: 16px;
  text-align: left;
  &::before {
    /* content: "등록자:";
    font-size: 14px;
    margin-right: 16px;
    vertical-align: middle;
    opacity: 0.8; */
  }
  img,
  .card_user_nickname {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 100%;
  }
  .card_user_nickname {
    margin-left: 8px;
    font-size: 14px;
  }
`;

const CardMainComponent: React.FC<CardMainTypes> = ({
  exposeWord,
  isMyWord,
  closeCardModal,
  afterMyWordState,
}) => {
  const userData = useSession();

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
    setCardData(_objWord, state);
    setWordList([...wordList]);
    console.log(_objWord);
    newAlert(
      `${_objWord.word_name}의 상태가 ${state}로 변경되었습니다.`,
      "pstv"
    );
  };

  const setCardData = async (_objWord: ExposeWordTypes, _state: string) => {
    const res = await axios.post(
      "http://localhost:3000" + "/api/user/word/state",
      {
        wordInfo: {
          userId: userData.data?.user?.email,
          wordId: _objWord.word_id,
          wordState: _state,
        },
      }
    );
    afterMyWordState
      ? (() => {
          setTimeout(() => {
            afterMyWordState(res.data.state);
          }, 100);
        })()
      : void 0;
  };

  const setCardFlip = function (_objWord: ExposeWordTypes, e: any) {
    // _objWord.fliped = !_objWord.fliped;
    _objWord.fliped = true;
    setWordList([...wordList]);
  };

  useEffect(() => {
    console.log("wordList:::", exposeWord);
    setWordList([...exposeWord].reverse());
  }, [exposeWord]);

  const [wordList, setWordList] = useState<ExposeWordTypes[]>([]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [buttonState, setButtonState] = useState("");
  const router = useRouter();

  const goToWordReg = () => {
    router.push("/MyWords/Regist");
  };
  return (
    <>
      <MainWrapStyled ref={cardList}>
        {isMyWord ? (
          <></>
        ) : (
          <DataEmptyComponent
            title="더 이상 표시할 단어카드가 없습니다."
            detail="설정에서 단어 노출 옵션을 변경해보세요.<br/>새로운 단어를 등록해보시는 건 어떨까요?"
            ppsTit="단어 등록하기"
            ppsFunc={goToWordReg}
          />
        )}
        {wordList.map((objWord: any, index: number) => (
          <CardSwiper
            // key={objWord.word_seq}
            key={index}
            className={`card ${objWord.fliped ? "fliped" : ""} ${
              objWord.state || ""
            }`} //${index === 0 ? "first" : ""}
            wordInfo={objWord}
            cardHandler={cardHandler}
            setButtonState={setButtonState}
          >
            <CardWrapStyled
              onPointerDown={(e) => {
                setCardFlip(objWord, e);
                setCurrentCardIdx(index);
              }}
            >
              <CardMainStyled
                exposeWord={exposeWord}
                className="cardMain"
                isMyWord={isMyWord}
              >
                {isMyWord ? (
                  <></>
                ) : (
                  <CardFrontStyled>
                    <Typo fontSize="24px" fontWeight="bold">
                      {objWord.word_name}
                    </Typo>
                  </CardFrontStyled>
                )}
                <CardBackStyled
                  className={
                    objWord.state != undefined ? `state_${objWord.state}` : ""
                  }
                >
                  {closeCardModal ? (
                    <ButtonCardClose onClick={() => closeCardModal([])}>
                      <Icon
                        iconShape={faXmark}
                        iconWidth="24px"
                        iconHeight="24px"
                        svgSize="24px"
                        align="auto"
                        color="#fff"
                      />
                    </ButtonCardClose>
                  ) : (
                    <></>
                  )}
                  <WordRegInfoStyled>
                    <img src={objWord.user_prf_img}></img>
                    <span className="card_user_nickname">
                      {objWord.user_nickname}
                    </span>
                  </WordRegInfoStyled>
                  <WordCateListStyled>
                    {objWord.word_is_cs_flag ? <span>CS</span> : <></>}
                    {objWord.word_is_web_flag ? <span>WEB</span> : <></>}
                    {objWord.word_is_ntv_flag ? <span>NATIVE</span> : <></>}
                  </WordCateListStyled>
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
            backgroundColor="rgba(255,255,255,.35)"
            color="#fff"
            height="40px"
            className="btn_word_s"
            onClick={(e: any) => {
              cardHandler.skip(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="즐겨찾기"
            backgroundColor="rgba(255,255,255,.35)"
            color="#fff"
            height="40px"
            className="btn_word_f"
            onClick={(e: any) => {
              cardHandler.fav(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="모르는단어"
            backgroundColor="rgba(255,255,255,.35)"
            color="#fff"
            height="40px"
            className="btn_word_d"
            onClick={(e: any) => {
              cardHandler.dontKnow(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="아는단어"
            backgroundColor="rgba(255,255,255,.35)"
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
