import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import CardMain, { ExposeWordTypes } from "./components/templates/CardMain";
import wrapper from "redux/store";
import { UserDataTypes, setUserData } from "redux/slices/user";

interface dataWordListTypes {
  dataWordList: ExposeWordTypes;
}

const Home: NextPage = ({ dataWordList }: any) => {
  const [exposeWord, setExposeWord] = useState([]);
  useEffect(() => {
    setExposeWord(dataWordList);
  }, []);

  return (
    <>
      <CardMain exposeWord={exposeWord} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const res = await axios.get("http://localhost:3000" + "/api/word/list");
      return { props: { dataWordList: res.data } };
    }
);

export default Home;
