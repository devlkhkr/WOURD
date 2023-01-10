import type { NextPage } from "next";
import Button from "../components/atoms/Button";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";
import {
  FormEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
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
  /* height: 136px; */
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.05);
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
  padding-bottom: 32px;
`;

const MyWordListStyled = styled.div`
  height: calc(100% - 80px);
  /* margin-top: 16px; */
  overflow: hidden;
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

const MyWordCateListStyled = styled.div`
  span {
    & + span {
      &::before {
        content: "";
        display: inline-block;
        width: 1px;
        height: 9px;
        background-color: var(--color-grey);
        margin: 0 8px;
        opacity: 0.35;
        vertical-align: middle;
      }
    }
  }
  img {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-color: #f6f7f8;
  }
`;

const WordEditWrapStyeld = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  i {
    display: inline-block;
    & + i {
      margin-left: 12px;
    }
  }
`;

const MyWordsComponent: NextPage = ({ dataMyWordList }: any) => {
  const userData: any = useSession().data?.user;
  const [clickedWord, setClickedWord] = useState<ExposeWordTypes[]>([]);
  const [myWordList, setMyWordList] = useState<MyWordsListTypes[]>([]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [wordFilterOpened, setWordFilterOpened] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<ExposeWordTypes[]>([]);
  const router = useRouter();

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

  const myWordSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);

    let searchedData = myWordList.filter(
      (word) =>
        word.word_name
          .toUpperCase()
          .indexOf(event.target.value.toUpperCase()) != -1
    );

    searchedData.length == 0
      ? (() => {
          setSearchResult(dataMyWordList);
        })()
      : (() => {
          setSearchResult(searchedData);
          setMyWordList(searchedData);
        })();
    event.target.value.length == 0 || searchedData.length == 0
      ? setMyWordList(dataMyWordList)
      : setMyWordList(searchedData);
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            myWordSearchChange(event);
          }}
        />
      </WordCtrlStyled>
      <WordCount>
        <span>
          총 <i>{myWordList.length}</i>개의 카드
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
          <ToggleCheckComponent typo={"아는단어"} defaultChecked={true} />
          <ToggleCheckComponent typo={"모르는단어"} defaultChecked={true} />
          <ToggleCheckComponent typo={"즐겨찾은단어"} defaultChecked={true} />
          <ToggleCheckComponent typo={"건너뛴단어"} defaultChecked={true} />
          <ToggleCheckComponent typo={"CS"} defaultChecked={true} />
          <ToggleCheckComponent typo={"Web"} defaultChecked={true} />
          <ToggleCheckComponent typo={"Native"} defaultChecked={true} />
        </WordFilterList>
        <WordScrollStyled>
          {myWordList.length === 0 ? (
            searchKeyword.length === 0 ? (
              <DataEmptyComponent
                title={`등록된 단어가 없습니다.`}
                detail="메인화면에서 단어카드를 둘러보는 건 어떨까요?"
                ppsTit={`메인화면으로`}
                ppsFunc={goToMain}
                fullsize={true}
              />
            ) : (
              <DataEmptyComponent
                title={`${searchKeyword}에 대한 검색결과가 없습니다.`}
                detail="이 단어를 새로 등록해보시는 건 어떨까요?"
                ppsTit={`${searchKeyword} 등록하기`}
                ppsFunc={goToWordReg}
                fullsize={true}
              />
            )
          ) : (
            myWordList.map((objMyWord: MyWordsListTypes, index: number) => (
              <MyWordListWrapStyled
                key={index}
                className={`state_${objMyWord.word_state}`}
                onClick={() => myCardClick(objMyWord, index)}
              >
                <Typo
                  lineClamp="1"
                  fontSize="16px"
                  fontWeight="bold"
                  textAlign="left"
                >
                  {objMyWord.word_name}
                </Typo>
                {objMyWord.word_unravel ? (
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
                <MyWordCateListStyled>
                  <Typo
                    fontSize="12px"
                    color="var(--color-grey)"
                    marginTop="12px"
                    textAlign="left"
                  >
                    {objMyWord.word_is_cs_flag ? <span>CS</span> : <></>}
                    {objMyWord.word_is_web_flag ? <span>Web</span> : <></>}
                    {objMyWord.word_is_ntv_flag ? <span>Native</span> : <></>}
                  </Typo>
                  <WordEditWrapStyeld>
                    {objMyWord.user_id === userData.email ? (
                      <>
                        <Icon
                          iconShape={faEllipsis}
                          iconWidth="14px"
                          iconHeight="14px"
                          align="auto"
                          color="#acb8cf"
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            contextOnclick(event);
                          }}
                        />
                      </>
                    ) : (
                      <img src={objMyWord.user_prf_img} />
                    )}
                  </WordEditWrapStyeld>
                </MyWordCateListStyled>
              </MyWordListWrapStyled>
            ))
          )}
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
