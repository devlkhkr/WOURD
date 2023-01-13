import type { NextPage } from "next";
import Button from "../components/atoms/Button";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";
import {
  ChangeEvent,
  FormEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import Typo from "pages/components/atoms/Typo";
import CardMain, {
  ExposeWordTypes,
  getStateStrKr,
} from "pages/components/templates/CardMain";
import { useSelector } from "react-redux";
import { UserDataTypes } from "redux/slices/user";
import wrapper from "redux/store";
import { store } from "redux/store";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import InputText from "pages/components/atoms/InputText";
import Icon from "pages/components/atoms/Icon";
import {
  faEllipsis,
  faFilter,
  faPen,
  faPencil,
  faPlus,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "pages/components/atoms/Checkbox";
import Label from "pages/components/atoms/Label";
import ToggleCheckComponent from "pages/components/atoms/Toggle";
import DataEmptyComponent from "pages/components/molecules/DataEmpty";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
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
  /* margin-top: 16px; */
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
  /* text-align: right; */
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
  margin-top: 24px;
`;

const MyWordsComponent: NextPage = ({ dataMyWordList }: any) => {
  const userData: any = useSession().data?.user;
  const [clickedWord, setClickedWord] = useState<ExposeWordTypes[]>([]);
  const [myWordList, setMyWordList] = useState<MyWordsListTypes[]>([]);
  // const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [wordFilterOpened, setWordFilterOpened] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<MyWordsListTypes[]>([]);
  const [totalPgn, setTotalPgn] = useState(1);
  const searchInput = useRef<HTMLInputElement>();
  const router = useRouter();

  const myCardClick = (_objMyWord: MyWordsListTypes, _index: number) => {
    // setCurrentCardIdx(_index);
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
    // let tempWord = sprdMyWordList[currentCardIdx];
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
    sprdMyWordList.splice(currentCardIdx, 1);
    sprdMyWordList.unshift(tempWord[0]);
    setMyWordList(sprdMyWordList);
    console.log("clickedWord::", clickedWord);

    searchKeyword.length > 0 ? setSearchedData("s") : void 0;

    setClickedWord([]);
  };

  const setSearchedData = (keyword: string) => {
    let searchedData = myWordList.filter(
      (word) =>
        word.word_name.toUpperCase().indexOf(keyword.toUpperCase()) != -1
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

  interface wordOptListTypes {
    title: string;
    checked: boolean;
  }
  interface wordOptTglsTypes {
    optTitle: string;
    optList: wordOptListTypes[];
  }
  const wordOptTgls: wordOptTglsTypes[] = [
    {
      optTitle: "상태별",
      optList: [
        {
          title: "k",
          checked: true,
        },
        {
          title: "d",
          checked: true,
        },
        {
          title: "f",
          checked: true,
        },
        {
          title: "s",
          checked: true,
        },
      ],
    },
    {
      optTitle: "카테고리별",
      optList: [
        {
          title: "CS",
          checked: true,
        },
        {
          title: "Web",
          checked: true,
        },
        {
          title: "Native",
          checked: true,
        },
      ],
    },
  ];

  const myWordOptTglOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optList: wordOptListTypes
  ) => {
    console.log(event.target.checked);
    console.log(optList);
  };

  useEffect(() => {
    setMyWordList(dataMyWordList);
  }, [dataMyWordList]);

  useEffect(() => {
    console.log(myWordList);
    searchInput.current ? setSearchedData(searchInput.current.value) : void 0;
  }, [myWordList]);

  const isMyWordCardActive = (objMyWord: MyWordsListTypes) => {
    // return objMyWord.word_state === "k" ? true : false;
    return true;
  };

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
            {searchKeyword.length > 0 ? searchResult.length : myWordList.length}
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
          {wordOptTgls.map((objOpt: wordOptTglsTypes, index: number) => (
            <div key={index}>
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
              {objOpt.optList.map(
                (optList: wordOptListTypes, index: number) => (
                  <ToggleCheckComponent
                    key={index}
                    typo={getStateStrKr(optList.title)}
                    defaultChecked={optList.checked}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      myWordOptTglOnChange(event, optList)
                    }
                  />
                )
              )}
            </div>
          ))}
        </WordFilterList>
        {/* 
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
                    active={true}
                  />
                )
              )}
            </WordScrollStyled>
          </WordSearchResultStyled>
        ) : (
          <></>
        )} */}

        <WordScrollStyled>
          {myWordList.length === 0 && searchKeyword.length === 0 ? (
            <DataEmptyComponent
              title={`단어장에 등록된 단어가 없습니다.`}
              detail="홈 화면에서 단어카드를 둘러보는 건 어떨까요?"
              ppsTit={`카드 둘러보기`}
              ppsFunc={goToMain}
              fullsize={true}
            />
          ) : (
            myWordList.map((objMyWord: MyWordsListTypes, index: number) =>
              index < totalPgn * 5 ? (
                <MyWordCardComponent
                  objMyWord={objMyWord}
                  key={index}
                  onCardClick={myCardClick}
                  contextOnclick={contextOnclick}
                  active={isMyWordCardActive(objMyWord)}
                  // active={true}
                />
              ) : (
                void 0
              )
            )
          )}
          <MyWordEndContents>
            {myWordList.length >= totalPgn * 5 ? (
              <Button
                onClick={() => setTotalPgn(totalPgn + 1)}
                desc="더 보기"
                height="48px"
                backgroundColor="var(--color-grey)"
                color="#fff"
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
  // const session = await unstable_getServerSession(
  //   context.req,
  //   context.res,
  //   authOptions
  // );

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
