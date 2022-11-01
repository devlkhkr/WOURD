import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import CardMain from "./components/templates/CardMain";

const Home: NextPage = () => {
  const [exposeWord, setExposeWord] = useState([]);

  const getCardList: Function = async () => {
    await axios
      .get("http://localhost:3000" + "/api/word/list")
      .then((res: any) => {
        setExposeWord(res.data);
      });
  };
  useEffect(() => {
    getCardList();
  }, []);

  return (
    <>
      <CardMain exposeWord={exposeWord} />
    </>
  );
};

export default Home;
