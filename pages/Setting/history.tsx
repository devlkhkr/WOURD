import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import styledInterface from "../../functional/intefaces/styledComponent";

const owner = "devlkhkr";
const repo = "DEV-WORDS";

const SettingHistory = () => {
  const [repos, setRepos] = useState();
  const getData = async () => {
    try {
      const response = await axios({
        method: "get",
        // &page = 페이지네이션
        // &per_page = 한번에 가져올 아이템의 개수
        url: `https://api.github.com/repos/${owner}/${repo}/commits?&per_page=100`,
      });
      // console.log(response);
      const data = response.data;
      setRepos(data);
    } catch {
      console.log("오류");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>깃헙타이틀</div>
    </>
  );
};

export default SettingHistory;
