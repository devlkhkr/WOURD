import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import CardMain, { ExposeWordTypes } from "./components/templates/CardMain";
import wrapper from "redux/store";
import { UserDataTypes, setUserData } from "redux/slices/user";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

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

export const getServerSideProps = async (context: any) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const res = await fetch("http://localhost:3000" + "/api/word/list", {
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });
  const data = await res.json();
  return { props: { dataWordList: data } };
};

export default Home;
