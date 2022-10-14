import type { NextPage } from "next";
import { useState } from "react";
import CardMain from "./components/molecules/CardMain"

const Home: NextPage = () => {
  const [exposeWord, setExposeWord] = useState([
    {
      word: "SSR",
      unravel: "Server Side Rendering"
    },
    {
      word: "Default Word",
    }

  ])
  return (
    <div>
      <CardMain exposeWord={exposeWord} />
    </div>
  );
};

export default Home;
