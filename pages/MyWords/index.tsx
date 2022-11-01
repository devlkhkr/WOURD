import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../components/atoms/Button";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import Typo from "pages/components/atoms/Typo";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { UserData } from "redux/slices/user";

interface MyWordsListTypes {
  user_id: string;
  user_word_key: string;
  word_desc: string;
  word_name: string;
  word_reg_userid: string;
  word_unravel: string;
  word_state: string;
  state_modified_date: Date;
}

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

const MyWordsComponent: NextPage<MyWordsListTypes> = () => {
  const userData = useSelector<ReducerType, UserData[]>((state) => state.user);

  const router = useRouter();
  const addNewWordClick = () => {
    router.push("/MyWords/Regist");
  };

  const [myWordList, setMyWordList] = useState<MyWordsListTypes[]>([]);
  const getMyWordList: Function = async () => {
    const res = await axios
      .post("http://localhost:3000" + "/api/myword/list", {
        params: {
          userId: userData[0].id,
        },
      })
      .then(function (res) {
        setMyWordList(res.data);
      })
      .catch(function (err) {
        console.log(err);
      })
      .then(function () {
        // finally
      });
  };
  useEffect(() => {
    getMyWordList();
  }, []);

  return (
    <div>
      <Button
        desc="새로운 단어 등록하기"
        id="cancleRegWord"
        backgroundColor="#666"
        color="#fff"
        height="40px"
        onClick={addNewWordClick}
      ></Button>
      <MyWordListStyled>
        {myWordList.map((objMyWord: MyWordsListTypes, index: number) => (
          <MyWordListWrapStyled
            key={index}
            className={`state_${objMyWord.word_state}`}
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
    </div>
  );
};

export default MyWordsComponent;
