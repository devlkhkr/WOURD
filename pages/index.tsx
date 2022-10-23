import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import CardMain from "./components/molecules/CardMain";

const Home: NextPage = () => {
  const [exposeWord, setExposeWord] = useState([]);
  const getCardList:Function = async() => {
    const res = await axios.get('http://localhost:9090' + '/api/words/list');
    return res
  }
  useEffect(() => {
    getCardList().then((res:any) => {
      setExposeWord(res.data);
    });
  }, []);

  return (
    <>
      <CardMain exposeWord={exposeWord} />
    </>
  );
};

export default Home;
