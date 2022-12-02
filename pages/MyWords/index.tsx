import type { NextPage } from "next";
import { useRouter } from "next/router";
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
import { faFilter, faSliders } from "@fortawesome/free-solid-svg-icons";

interface MyWordsListTypes {
  user_id: string;
  user_word_key: string;
  word_id: string;
  word_desc: string;
  word_name: string;
  word_reg_userid: string;
  word_unravel: string;
  word_state: string;
  word_is_cs_flag: number;
  word_is_web_flag: number;
  word_is_native_flag: number;
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
  &[class*="state"] {
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
      border-color: transparent #f3f3f3 transparent transparent;
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

const MyWordListStyled = styled.div``;
const WordCtrlStyled = styled.div`
  width: 100%;
  > * {
    vertical-align: middle;
  }
`;
const FilterStyled = styled.div`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  z-index: 1;
`;

const MyWordsComponent: NextPage = ({ dataMyWordList }: any) => {
  const router = useRouter();
  const addNewWordClick = () => {
    router.push("/MyWords/Regist");
  };

  const [clickedWord, setClickedWord] = useState<ExposeWordTypes[]>([]);
  const [myWordList, setMyWordList] = useState<MyWordsListTypes[]>([]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

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
        word_is_cs_flag: _objMyWord.word_is_cs_flag,
        word_is_web_flag: _objMyWord.word_is_web_flag,
        word_is_native_flag: _objMyWord.word_is_native_flag,
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
      <MyWordListStyled>
        <WordCtrlStyled>
          <Button
            width="200px"
            height="40px"
            type="button"
            desc="+ 새로운 단어 등록"
            backgroundColor="var(--color-point)"
            color="#fff"
            onClick={addNewWordClick}
            fontSize="12px"
            fontWeight="bold"
          ></Button>
          <FilterStyled>
            <Icon
              iconShape={faSliders}
              iconWidth="24px"
              iconHeight="24px"
              color="var(--color-grey)"
            />
          </FilterStyled>
        </WordCtrlStyled>
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

  const res = await fetch(
    "http://localhost:3000" +
      "/api/myword/list?" +
      new URLSearchParams({
        userId: session?.user?.email!,
      })
  );
  const data = await res.json();

  return {
    props: {
      dataMyWordList: data,
    },
  };
}

export default MyWordsComponent;
