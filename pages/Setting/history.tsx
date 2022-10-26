import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";

const owner = 'devlkhkr';
const token = process.env.REACT_APP_GIT_TOKEN;
const repo = 'DEV-WORDS'
console.log(repo)

const SettingHistory = () => {
  const [repos, setRepos] = useState();
  const getData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.github.com/repos/${owner}/${repo}/commits`,
      })
      console.log(response)
      const data = response.data
      setRepos(data)
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
      <ul>
        <li>

        </li>
      </ul>
    </>
  );
};

export default SettingHistory;
