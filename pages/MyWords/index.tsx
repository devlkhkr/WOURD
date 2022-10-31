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
        console.log(res.data);
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
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 20px 20px 0;
        border-color: transparent;
      }
    }
    &.state {
      &_k::after {
        border-color: transparent var(--color-point) transparent transparent;
      }
      &_d::after {
        border-color: transparent #ea8c47 transparent transparent;
      }
      &_f::after {
        border-color: transparent #dddf56 transparent transparent;
      }
      &_s::after {
        border-color: transparent #b977bf transparent transparent;
      }
    }
  `;

  const MyWordListStyled = styled.div``;
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
                marginTop="8px"
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
              marginTop="8px"
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
