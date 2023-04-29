import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Button from "../atoms/Button";
import Typo from "../atoms/Typo";

import Icon from "pages/components/atoms/Icon";
import {
  faArrowUpRightFromSquare,
  faBan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import CardSwiper from "../organisms/CardSwiper";
import styledInterface from "../../../functional/intefaces/styledComponent";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { useSession } from "next-auth/react";
import DataEmptyComponent from "../molecules/DataEmpty";
import { useRouter } from "next/router";
import { newAlert } from "../atoms/Alert";
import StyledComponentTypes from "../../../functional/intefaces/styledComponent";
import { needLogin } from "pages/Login";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { newContext } from "../organisms/Context";
import { newConfirm } from "./Confirm";
import { store } from "redux/store";
import { closeConfirm } from "redux/slices/confirm";
import { MyWordsListTypes } from "../organisms/MyWordCard";

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
  padding: 16px;
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
  color: #ffffff;
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

const BtnWrapCardCtrlStyled = styled.div<StyledComponentTypes>`
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
  z-index: ${(props) => props.zIndex || "inherit"};
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

const WordCateListStyled = styled.div`
  margin-bottom: 6px;
  span {
    font-size: 12px;
    color: #fff;
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
  display: flex;
  width: calc(100% - 32px);
  position: absolute;
  left: 16px;
  top: 16px;
  text-align: left;
  > span {
    width: 50%;
  }
`;

const WordOwnerInfo = styled.span`
  img,
  .card_user_nickname {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    width: 24px;
    height: 24px;
    background-color: #ffffff75;
    border-radius: 100%;
  }
  .card_user_nickname {
    margin-left: 8px;
    font-size: 14px;
  }
`;

const ButtonCardRemote = styled.span`
  line-height: 24px;
  text-align: right;
  i {
    display: inline-block;
    vertical-align: top;
    & + i {
      margin-left: 12px;
    }
  }
`;

const BluredGradientBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(to right, #ffffff, #ece9e6);
  display: flex;
  flex-grow: 1;
  border-radius: 16px;
  overflow: hidden;
  z-index: -1;
  div {
    position: absolute;
    border-radius: 100%;
    filter: blur(100px);
    opacity: 0.4;
    &:nth-child(1) {
      background: linear-gradient(132deg, #ff00dc 0%, #1f91cf 100%);
      width: 200px;
      height: 200px;
      left: -50px;
      top: -50px;
    }
    &:nth-child(2) {
      background: linear-gradient(132deg, #39ff00 0%, #00a6ff 100%);
      width: 60vw;
      height: 60vw;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    &:nth-child(3) {
      background: linear-gradient(132deg, #ff0000 0%, #ffed00 100%);
      width: 200px;
      height: 200px;
      right: -40px;
      bottom: -40px;
    }
  }
`;

export function getStateStrKr(state: string) {
  switch (state) {
    case "k":
      return "아는단어";
    case "d":
      return "모르는단어";
    case "f":
      return "즐겨찾은단어";
    case "s":
      return "건너뛴단어";
    case "cs":
      return "CS";
    case "web":
      return "Web";
    case "ntv":
      return "Native";
    case "my":
      return "내가 등록한 단어";
    case "others":
      return "다른사람이 등록한 단어";
    default:
      return state;
  }
}

const CardMainComponent: React.FC<CardMainTypes> = ({
  exposeWord,
  isMyWord,
  closeCardModal,
  afterMyWordState,
}) => {
  const { data: session, status } = useSession();

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
    session
      ? (() => {
          setButtonState("");
          _objWord.fliped = false;
          _objWord.state = `state_${state}`;
          setCardData(_objWord, state);
          setWordList([...wordList]);
          // console.log(_objWord);
          newAlert(
            `${_objWord.word_name}의 상태가 ${getStateStrKr(
              state
            )}로 변경되었습니다.`,
            "pstv"
          );
          let tempCardIdx = cardIdx + 1;
          setCardIdx(tempCardIdx);
        })()
      : (() => {
          needLogin();
        })();
  };

  const setCardData = async (_objWord: ExposeWordTypes, _state: string) => {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_ORIGIN + "/api/user/word/state",
      {
        wordInfo: {
          userId: session?.user?.email,
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
    // setWordList([...exposeWord].reverse());
    setWordList([...exposeWord]);
  }, [exposeWord]);

  const [wordList, setWordList] = useState<ExposeWordTypes[]>([]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [buttonState, setButtonState] = useState("");
  const router = useRouter();
  const [cardIdx, setCardIdx] = useState(0);

  const reportOnclick = (_objWord: any, reportType: number) => {
    newConfirm({
      submitTit: `신고하기`,
      confirmText: `'${_objWord.word_name}' 단어를 신고하시겠습니까?`,
      confirmSubmit: () => {
        store.dispatch(closeConfirm());
        newAlert(
          "신고가 완료되었습니다. 해당 단어의 검토가 진행됩니다.",
          "pstv"
        );
      },
    });
  };

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
            fullsize={true}
          />
        )}
        {wordList.map((objWord: any, index: number) =>
          cardIdx + 2 > index && index > cardIdx - 2 ? (
            <CardSwiper
              // key={objWord.word_seq}
              key={index}
              className={`card ${objWord.fliped ? "fliped" : ""} ${
                objWord.state || ""
              }`} //${index === 0 ? "first" : ""}
              wordInfo={objWord}
              cardHandler={cardHandler}
              setButtonState={setButtonState}
              zIndex={wordList.length - index}
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
                      <Typo fontSize="20px" fontWeight="bold">
                        {objWord.word_name}
                      </Typo>
                    </CardFrontStyled>
                  )}
                  <CardBackStyled
                    className={
                      objWord.state != undefined ? `state_${objWord.state}` : ""
                    }
                  >
                    {/* <BluredGradientBg>
                      <div></div>
                      <div></div>
                      <div></div>
                    </BluredGradientBg> */}
                    <WordRegInfoStyled>
                      <WordOwnerInfo>
                        <img src={objWord.user_prf_img}></img>
                        <span className="card_user_nickname">
                          {objWord.user_nickname}
                        </span>
                      </WordOwnerInfo>
                      <ButtonCardRemote>
                        <Icon
                          iconShape={faBan}
                          iconWidth="24px"
                          iconHeight="24px"
                          svgSize="16px"
                          color="#ffffff"
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            newContext({
                              title: "신고하기",
                              contextList: [
                                {
                                  contextTit: "틀린 내용이 있어요",
                                  color: "var(--color-grey)",
                                  onClick: () => {
                                    reportOnclick(objWord, 0);
                                  },
                                },
                                {
                                  contextTit: "부적절한 단어에요",
                                  color: "var(--color-grey)",
                                  onClick: () => {
                                    reportOnclick(objWord, 1);
                                  },
                                },
                                {
                                  contextTit: "중복 등록된 단어에요",
                                  color: "var(--color-grey)",
                                  onClick: () => {
                                    reportOnclick(objWord, 1);
                                  },
                                },
                              ],
                              isOpen: true,
                              position: { x: event.pageX, y: event.pageY },
                            });
                          }}
                        />
                        <Icon
                          iconShape={faArrowUpRightFromSquare}
                          iconWidth="24px"
                          iconHeight="24px"
                          svgSize="16px"
                          color="#ffffff"
                          onClick={() => {
                            if (window.navigator.share!) {
                              window.navigator.share({
                                title: objWord.word_name, // 공유될 제목
                                text: `지금 WOURD에서 ${objWord.word_name}에 대하여 알아보세요.`, // 공유될 설명
                                url: "", // 공유될 URL
                                files: [], // 공유할 파일 배열
                              });
                            } else {
                              newAlert(
                                "공유하기를 지원하지 않는 기기입니다.",
                                "ngtv"
                              );
                            }
                          }}
                        />
                        {closeCardModal ? (
                          <Icon
                            iconShape={faXmark}
                            iconWidth="24px"
                            iconHeight="24px"
                            svgSize="22px"
                            color="#ffffff"
                            onClick={() => closeCardModal([])}
                          />
                        ) : (
                          <></>
                        )}
                      </ButtonCardRemote>
                    </WordRegInfoStyled>
                    <WordCateListStyled>
                      {objWord.word_is_cs_flag ? <span>CS</span> : <></>}
                      {objWord.word_is_web_flag ? <span>WEB</span> : <></>}
                      {objWord.word_is_ntv_flag ? <span>NATIVE</span> : <></>}
                    </WordCateListStyled>
                    <Typo fontSize="20px" fontWeight="bold">
                      {objWord.word_name}
                    </Typo>
                    <Typo fontSize="14px" fontWeight="semi-bold">
                      {objWord.word_unravel}
                    </Typo>
                    <Typo fontSize="14px" fontWeight="regular" textAlign="left">
                      {objWord.word_desc}
                    </Typo>
                  </CardBackStyled>
                </CardMainStyled>
              </CardWrapStyled>
            </CardSwiper>
          ) : (
            void 0
          )
        )}
        <BtnWrapCardCtrlStyled
          className={`btn_wrap_cardctrl ${buttonState}`}
          zIndex={wordList.length}
        >
          <Button
            desc="건너뛰기"
            backgroundColor="rgba(255,255,255,.35)"
            color="#fff"
            height="40px"
            className="btn_word_s"
            onPointerDown={(e: any) => {
              cardHandler.skip(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="즐겨찾기"
            backgroundColor="rgba(255,255,255,.35)"
            color="#fff"
            height="40px"
            className="btn_word_f"
            onPointerDown={(e: any) => {
              cardHandler.fav(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="모르는단어"
            backgroundColor="rgba(255,255,255,.35)"
            color="#fff"
            height="40px"
            className="btn_word_d"
            onPointerDown={(e: any) => {
              cardHandler.dontKnow(wordList[currentCardIdx], e);
            }}
          />
          <Button
            desc="아는단어"
            backgroundColor="rgba(255,255,255,.35)"
            color="#fff"
            height="40px"
            className="btn_word_k"
            onPointerDown={(e: any) => {
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
