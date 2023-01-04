import type { NextPage } from "next";
import Button from "../components/atoms/Button";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import Typo from "pages/components/atoms/Typo";
import CardMain, { ExposeWordTypes } from "pages/components/templates/CardMain";
import { useSelector } from "react-redux";
import { UserDataTypes } from "redux/slices/user";
import wrapper from "redux/store";
import { store } from "redux/store";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import InputText from "pages/components/atoms/InputText";
import Icon from "pages/components/atoms/Icon";
import { faFilter, faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "pages/components/atoms/Checkbox";
import Label from "pages/components/atoms/Label";

interface MyWordsListTypes {
  user_id: string;
  user_word_key: string;
  word_id: string;
  word_desc: string;
  word_name: string;
  word_reg_userid: string;
  word_unravel: string;
  word_state: string;
  user_prf_img: string;
  user_nickname: string;
  word_is_cs_flag: number;
  word_is_web_flag: number;
  word_is_ntv_flag: number;
  state_modified_date: Date;
}

const MyClickedCardStyled = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: var(--height-header);
  z-index: 9999;
  width: 100%;
  max-width: 720px;
  height: calc(100% - var(--height-header) - var(--height-footer));
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
`;

const MyWordListWrapStyled = styled.div`
  width: 100%;
  height: 120px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  position: relative;
  overflow: hidden;
  /* box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.05); */
  &[class*="state"] {
    &:first-child {
      margin-top: 0;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      right: 0;
      top: 0;
    }
    &::after {
      border-width: 0 20px 20px 0;
      border-color: transparent #f6f7f8 transparent transparent;
    }
    &::before {
      border-width: 20px 0 0 20px;
      border-color: transparent transparent transparent red;
    }
  }
  &.state {
    &_k::before {
      border-color: transparent transparent transparent #94be88;
    }
    &_d::before {
      border-color: transparent transparent transparent #da8484;
    }
    &_f::before {
      border-color: transparent transparent transparent #c8be51;
    }
    &_s::before {
      border-color: transparent transparent transparent #bb88be;
    }
  }
`;

const WordScrollStyled = styled.div`
  height: 100%;
  overflow: auto;
  padding-bottom: 64px;
`;

const MyWordListStyled = styled.div`
  height: calc(100% - 40px);
  margin-top: 20px;
  overflow: hidden;
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 64px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(transparent, #f6f7f8);
    pointer-events: none;
  }
`;

const WordCtrlStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  overflow: hidden;
  i {
    display: inline-block;
    overflow: hidden;
    margin-left: 16px;
  }
  > * {
    vertical-align: middle;
  }
`;

const WordCtrlIconWrap = styled.div`
  display: inline-block;
`;

const WordFilterList = styled.div`
  width: 240px;
  height: 200px;
  padding: 16px;
  background-color: #fff;
  position: absolute;
  right: 20px;
  top: calc(var(--height-header) + 60px);
  z-index: 1;
  border-radius: 8px;
  box-shadow: 0px 4px 12px 8px rgba(0, 0, 0, 0.05);
  opacity: 0;
  pointer-events: none;
  transition-duration: 0.3s;
  &.active {
    opacity: 1;
    pointer-events: all;
  }
`;

const MyWordsComponent: NextPage = ({ dataMyWordList }: any) => {
  const [clickedWord, setClickedWord] = useState<ExposeWordTypes[]>([]);
  const [myWordList, setMyWordList] = useState<MyWordsListTypes[]>([]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [wordFilterOpened, setWordFilterOpened] = useState(false);
  console.log(myWordList);
  const myCardClick = (_objMyWord: MyWordsListTypes, _index: number) => {
    setCurrentCardIdx(_index);
    let obj = [
      {
        word_desc: _objMyWord.word_desc,
        word_id: _objMyWord.word_id,
        word_name: _objMyWord.word_name,
        word_reg_date: new Date(),
        word_reg_userid: _objMyWord.word_reg_userid,
        word_seq: 0,
        word_unravel: _objMyWord.word_unravel,
        fliped: true,
        state: _objMyWord.word_state,
        user_prf_img: _objMyWord.user_prf_img,
        user_nickname: _objMyWord.user_nickname,
        word_is_cs_flag: _objMyWord.word_is_cs_flag,
        word_is_web_flag: _objMyWord.word_is_web_flag,
        word_is_ntv_flag: _objMyWord.word_is_ntv_flag,
      },
    ];
    setClickedWord(obj);
  };

  const afterMyWordState = (userSelectState: string) => {
    let sprdMyWordList = [...myWordList];
    let tempWord = sprdMyWordList[currentCardIdx];
    tempWord.word_state = userSelectState;
    sprdMyWordList.splice(currentCardIdx, 1);
    sprdMyWordList.unshift(tempWord);

    setMyWordList(sprdMyWordList);
    setClickedWord([]);
  };

  useEffect(() => {
    setMyWordList(dataMyWordList);
  }, []);

  return (
    <>
      {clickedWord.length === 1 ? (
        <MyClickedCardStyled>
          <CardMain
            exposeWord={clickedWord}
            isMyWord={true}
            closeCardModal={setClickedWord}
            afterMyWordState={afterMyWordState}
          />
        </MyClickedCardStyled>
      ) : (
        <></>
      )}
      <WordCtrlStyled>
        <InputText
          type="text"
          placeHolder="단어명으로 검색"
          className="input_bg_search"
        />
        <WordCtrlIconWrap>
          <Icon
            iconShape={faSliders}
            iconWidth="20px"
            iconHeight="20px"
            color="var(--color-grey)"
            onClick={() => setWordFilterOpened(!wordFilterOpened)}
          />
        </WordCtrlIconWrap>
      </WordCtrlStyled>
      <WordFilterList className={wordFilterOpened ? "active" : ""}>
        <Checkbox id="aaa" />
        <Label desc="아는 단어" htmlFor="aaa" />
      </WordFilterList>
      <MyWordListStyled>
        <WordScrollStyled>
          {myWordList.map((objMyWord: MyWordsListTypes, index: number) => (
            <MyWordListWrapStyled
              key={index}
              className={`state_${objMyWord.word_state}`}
              onClick={() => myCardClick(objMyWord, index)}
            >
              <Typo
                lineClamp="1"
                fontSize="18px"
                fontWeight="bold"
                textAlign="left"
              >
                {objMyWord.word_name}
              </Typo>
              {objMyWord.word_unravel != null ? (
                <Typo
                  lineClamp="1"
                  textAlign="left"
                  marginTop="4px"
                  color="var(--color-grey)"
                >
                  {objMyWord.word_unravel}
                </Typo>
              ) : (
                <></>
              )}
              <Typo
                lineClamp={objMyWord.word_unravel == null ? "3" : "2"}
                textAlign="left"
                marginTop="10px"
              >
                {objMyWord.word_desc}
              </Typo>
            </MyWordListWrapStyled>
          ))}
        </WordScrollStyled>
      </MyWordListStyled>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  // const res = await axios.post("http://localhost:3000" + "/api/myword/list", {
  //   params: {
  //     userId: session?.user?.email,
  //   },
  // });

  const res = await fetch("http://localhost:3000" + "/api/myword/list", {
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });
  const data = await res.json();

  return {
    props: {
      dataMyWordList: data,
    },
  };
}

export default MyWordsComponent;
