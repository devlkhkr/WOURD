import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import CardMain, { ExposeWordTypes } from "./components/templates/CardMain";
import wrapper from "redux/store";
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
<<<<<<< Updated upstream
  const res = await fetch(process.env.NEXT_PUBLIC_ORIGIN + "/api/word/list", {
=======
  const session = await getSession(context);
  console.log(session);
  let wordListApi = session != null ? "/api/word/list" : "/api/word/preview";

  const res = await fetch(process.env.NEXT_PUBLIC_ORIGIN + wordListApi, {
>>>>>>> Stashed changes
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });
  const data = await res.json();
  return { props: { dataWordList: data } };
};

export default Home;
