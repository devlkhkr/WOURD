import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../components/atoms/Button";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";
import { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { UserData } from "redux/slices/user";

interface MyWordsTypes {}

const MyWordsComponent: NextPage<MyWordsTypes> = () => {
  const userData = useSelector<ReducerType, UserData[]>((state) => state.user);

  const router = useRouter();
  const addNewWordClick = () => {
    router.push("/MyWords/Regist");
  };

  const [myWordList, setMyWordList] = useState([]);
  const getMyWordList: Function = async () => {
    const res = await axios
      .post("http://localhost:9090" + "/api/myword/list", {
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
        {myWordList.map((objMyWord: any, index: any) => (
          <div></div>
        ))}
      </MyWordListStyled>
    </div>
  );
};

export default MyWordsComponent;
