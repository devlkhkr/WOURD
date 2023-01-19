import type { NextPage } from "next";
import Button from "../components/atoms/Button";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Typo from "pages/components/atoms/Typo";
import CardMain, {
  ExposeWordTypes,
  getStateStrKr,
} from "pages/components/templates/CardMain";

import InputText from "pages/components/atoms/InputText";
import Icon from "pages/components/atoms/Icon";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import ToggleCheckComponent from "pages/components/atoms/Toggle";
import DataEmptyComponent from "pages/components/molecules/DataEmpty";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MyWordCardComponent, {
  MyWordsListTypes,
} from "pages/components/organisms/MyWordCard";

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

const WordScrollStyled = styled.div`
  height: 100%;
  overflow: auto;
  padding-bottom: 32px;
`;

const bottomFadeOutCss = `
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 32px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(transparent, #f6f7f8);
    pointer-events: none;
  }
`;

const MyWordListStyled = styled.div`
  height: calc(100% - 80px);
  overflow: hidden;
  ${bottomFadeOutCss};
`;

const WordSearchResultStyled = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9998;
  background-color: #f5f6f7;
  overflow: hidden;
  ${bottomFadeOutCss};
`;

const WordCtrlStyled = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  overflow: hidden;
  i {
    display: inline-block;
    overflow: hidden;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translate(0, -50%);
  }
  input {
    padding-right: 40px;
  }
  > * {
    vertical-align: middle;
  }
`;

const WordCtrlIconWrap = styled.div`
  display: inline-flex;
  align-items: center;
`;

const WordFilterList = styled.div`
  width: 240px;
  padding: 8px;
  background-color: #fff;
  position: absolute;
  right: 0;
  /* top: calc(var(--height-header) + 60px); */
  top: 0;
  z-index: 9999;
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

const WordCount = styled.div`
  display: flex;
  font-size: 12px;
  color: var(--color-grey);
  height: 40px;
  line-height: 40px;
  span {
    display: inline-block;
    width: 100%;
    i {
      color: #333;
    }
  }
`;

const MyWordEndContents = styled.div`
  /* margin-top: 24px; */
`;

const MyWordsComponent: NextPage = ({ dataMyWordList }: any) => {
  const userData: any = useSession().data?.user;

  const [clickedWord, setClickedWord] = useState<ExposeWordTypes[]>([]);
  const [myWordList, setMyWordList] = useState<MyWordsListTypes[]>([]);
  const [fltrdMyWordList, setFltrdMyWordList] = useState<MyWordsListTypes[]>([
    ...myWordList,
  ]);
  const [wordFilterOpened, setWordFilterOpened] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<MyWordsListTypes[]>([]);
  const [totalPgn, setTotalPgn] = useState(1);

  const searchInput = useRef<HTMLInputElement>();
  const router = useRouter();

  const myCardClick = (_objMyWord: MyWordsListTypes, _index: number) => {
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
    let currentCardIdx = 0;
    for (let w = 0; w < sprdMyWordList.length; w++) {
      if (sprdMyWordList[w].word_id === clickedWord[0].word_id) {
        currentCardIdx = w;
        break;
      } else {
        continue;
      }
    }

    let tempWord = sprdMyWordList.filter(
      (word) => word.word_id === clickedWord[0].word_id
    );
    tempWord[0].word_state = userSelectState;

    let isToggleActive = wordOptTgls[0].optList.filter(
      (opt) => opt.optType === userSelectState
    )[0].checked;

    tempWord[0].active_state_flag = isToggleActive ? true : false;

    sprdMyWordList.splice(currentCardIdx, 1);
    sprdMyWordList.unshift(tempWord[0]);

    setMyWordList(sprdMyWordList);

    setClickedWord([]);
  };

  const setSearchedData = (keyword: string) => {
    let searchedData = fltrdMyWordList.filter(
      (word) =>
        word.word_name.toUpperCase().indexOf(keyword.toUpperCase()) != -1 &&
        word.active_state_flag &&
        word.active_cate_flag
    );

    searchedData.length == 0
      ? (() => {
          setSearchResult([]);
        })()
      : (() => {
          setSearchResult(searchedData);
        })();
  };

  const myWordSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    setSearchedData(event.target.value);
  };

  const goToWordReg = () => {
    router.push("/MyWords/Regist");
  };

  const goToMain = () => {
    router.push("/");
  };

  const editOnclick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log("edit word");
  };

  const contextOnclick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log("context onclick");
  };

  interface optListTypes {
    optType: string;
    checked: boolean;
    // changeState?: Dispatch<SetStateAction<boolean>>;
  }
  interface wordOptTglsTypes {
    optTitle: string;
    optList: optListTypes[];
  }

  const [activeStateFlags, setActiveStateFlags] = useState<optListTypes[]>([
    { optType: "k", checked: true },
    { optType: "d", checked: true },
    { optType: "f", checked: true },
    { optType: "s", checked: false },
  ]);
  const [activeCateFlags, setActiveCateFlags] = useState<optListTypes[]>([
    { optType: "cs", checked: true },
    { optType: "web", checked: true },
    { optType: "ntv", checked: true },
  ]);

  const wordOptTgls: wordOptTglsTypes[] = [
    {
      optTitle: "상태별",
      optList: activeStateFlags,
    },
    {
      optTitle: "카테고리별",
      optList: activeCateFlags,
    },
  ];

  const myWordOptTglOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optType: string
  ) => {
    switch (optType) {
      case "k":
      case "d":
      case "f":
      case "s":
        let tempMyWordList: MyWordsListTypes[] = [...myWordList];
        let tempActiveStateFlags = [...activeStateFlags];
        let targetStateOpt = tempActiveStateFlags.filter(
          (opt) => opt.optType === optType
        );
        targetStateOpt[0].checked = event.target.checked;
        setActiveStateFlags(tempActiveStateFlags);

        tempMyWordList.map((word: MyWordsListTypes, index: number) => {
          word.word_state === optType
            ? (word.active_state_flag = event.target.checked)
            : void 0;
        });

        setMyWordList(tempMyWordList);

        break;
      case "cs":
      case "web":
      case "ntv":
        let tempActiveCateFlags = [...activeCateFlags];
        let targetCateOpt = tempActiveCateFlags.filter(
          (opt) => opt.optType === optType
        );
        targetCateOpt[0].checked = event.target.checked;
        setActiveCateFlags(tempActiveCateFlags);
        break;
      default:
        console.log("토글 타입 미정의 에러");
    }
  };

  useEffect(() => {
    let disabledOpt: string[] = [];
    let abledOpt: string[] = [];
    //disable 후 able 해주어야 중복 카테고리도 표시할 수 있으므로 map으로 disabledOpt, abledOpt 분리
    activeCateFlags.map((opt, index) => {
      opt.checked ? abledOpt.push(opt.optType) : disabledOpt.push(opt.optType);
    });

    let tempMyWordList: MyWordsListTypes[] = [...myWordList];
    tempMyWordList.map((word: MyWordsListTypes, index: number) => {
      for (let d = 0; d < disabledOpt.length; d++) {
        word[`word_is_${disabledOpt[d]}_flag`]
          ? (word.active_cate_flag = false)
          : void 0;
      }
      for (let a = 0; a < abledOpt.length; a++) {
        word[`word_is_${abledOpt[a]}_flag`]
          ? (word.active_cate_flag = true)
          : void 0;
      }
    });
    setMyWordList(tempMyWordList);
  }, [activeCateFlags]);

  useEffect(() => {
    setMyWordList(dataMyWordList);
  }, [dataMyWordList]);

  useEffect(() => {
    let tempFltrdMyWordList = myWordList.filter(
      (word) => word.active_cate_flag && word.active_state_flag
    );
    setFltrdMyWordList(tempFltrdMyWordList);
  }, [myWordList]);

  useEffect(() => {
    searchInput.current ? setSearchedData(searchInput.current.value) : void 0;
  }, [fltrdMyWordList]);

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
          reference={searchInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            myWordSearchChange(event);
          }}
        />
      </WordCtrlStyled>
      <WordCount>
        <span>
          총{" "}
          <i>
            {searchKeyword.length > 0
              ? searchResult.length
              : fltrdMyWordList.length}
          </i>
          개의 카드
        </span>
        <WordCtrlIconWrap>
          <Icon
            iconShape={faSliders}
            iconWidth="16px"
            iconHeight="16px"
            color="var(--color-grey)"
            onClick={() => setWordFilterOpened(!wordFilterOpened)}
          />
        </WordCtrlIconWrap>
      </WordCount>
      <MyWordListStyled>
        <WordFilterList className={wordFilterOpened ? "active" : ""}>
          {wordOptTgls.map((objOpt: wordOptTglsTypes, cateIdx: number) => (
            <div key={cateIdx}>
              <Typo
                textAlign="left"
                marginTop="16px"
                marginBottom="4px"
                fontSize="12px"
                fontWeight="semi-bold"
                color="var(--color-grey)"
                paddingLeft="8px"
              >
                {objOpt.optTitle}
              </Typo>
              {objOpt.optList.map((optList: optListTypes, index: number) => (
                <ToggleCheckComponent
                  key={index}
                  typo={getStateStrKr(optList.optType)}
                  defaultChecked={optList.checked}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    myWordOptTglOnChange(event, optList.optType);
                  }}
                />
              ))}
            </div>
          ))}
        </WordFilterList>

        {searchKeyword.length != 0 ? (
          <WordSearchResultStyled>
            <WordScrollStyled>
              {searchResult.length === 0 ? (
                <DataEmptyComponent
                  title={`${searchKeyword}에 대한 검색결과가 없습니다.`}
                  detail="이 단어를 새로 등록해보시는 건 어떨까요?"
                  ppsTit={`${searchKeyword} 등록하기`}
                  ppsFunc={goToWordReg}
                  fullsize={true}
                />
              ) : (
                <></>
              )}
              {searchResult.map(
                (objMyWord: MyWordsListTypes, index: number) => (
                  <MyWordCardComponent
                    key={index}
                    objMyWord={objMyWord}
                    onCardClick={myCardClick}
                    contextOnclick={contextOnclick}
                    searchKeyword={searchKeyword}
                  />
                )
              )}
            </WordScrollStyled>
          </WordSearchResultStyled>
        ) : (
          <></>
        )}

        <WordScrollStyled>
          {fltrdMyWordList.map((objMyWord: MyWordsListTypes, index: number) =>
            index < totalPgn * 5 ? (
              <MyWordCardComponent
                objMyWord={objMyWord}
                key={index}
                onCardClick={myCardClick}
                contextOnclick={contextOnclick}
              />
            ) : (
              void 0
            )
          )}
          <MyWordEndContents>
            {fltrdMyWordList.length > totalPgn * 5 ? (
              <Button
                onClick={() => setTotalPgn(totalPgn + 1)}
                desc="더 보기"
                height="48px"
                backgroundColor="var(--color-grey)"
                color="#fff"
                marginTop="24px"
              />
            ) : myWordList.length === 0 && searchKeyword.length === 0 ? (
              <DataEmptyComponent
                title={`단어장에 등록된 카드가 없습니다.`}
                detail="홈 화면에서 단어카드를 둘러보는 건 어떨까요?"
                ppsTit={`카드 둘러보기`}
                ppsFunc={goToMain}
                fullsize={true}
              />
            ) : (
              <DataEmptyComponent
                title={`더 이상 표시할 카드가 없습니다.`}
                detail="홈 화면에서 단어카드를 둘러보는 건 어떨까요?"
                ppsTit={`카드 둘러보기`}
                ppsFunc={goToMain}
                fullsize={false}
              />
            )}
          </MyWordEndContents>
        </WordScrollStyled>
      </MyWordListStyled>
    </>
  );
};

export async function getServerSideProps(context: any) {
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
