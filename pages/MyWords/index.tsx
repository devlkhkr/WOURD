import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../components/atoms/Button";

interface MyWordsTypes { }

const MyWordsComponent: NextPage<MyWordsTypes> = () => {
  const router = useRouter();
  const addNewWordClick = () => {
    router.push("/MyWords/Regist");
  };

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
    </div>
  );
};

export default MyWordsComponent;
