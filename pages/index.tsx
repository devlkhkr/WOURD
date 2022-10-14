import type { NextPage } from "next";
import { useState } from "react";
import CardMain from "./components/molecules/CardMain"


const Home: NextPage = () => {
  const [exposeWord, setExposeWord] = useState([
    {
      word: "SSR",
      unravel: "Server Side Rendering",
      desc: "SSR이란 서버사이드 렌더링(Server Side Rendering)의 약자로 서버로부터 완전하게 만들어진 HTML 파일을 받아와 페이지 전체를 렌더링 하는 방식이다."
    },
    {
      word: "Maturity",
      desc: "(서비스) 성숙도, 완성도",
    },
    {
      word: "Framework",
      desc: "프레임워크(Framework)란, 소프트웨어의 구체적인 부분에 해당하는 설계와 구현을 재사용이 가능하게끔 일련의 협업화된 형태로 클래스들을 제공하는 것",
    }

  ])
  return (
    <>
      <CardMain exposeWord={exposeWord} />
    </>
  );
};

export default Home;
