import axios from "axios";
import { useEffect, useState } from "react";
import Typo from "../atoms/Typo";
import styled from "styled-components";
import styledInterface from "functional/intefaces/styledComponent";

const gitOwner = "devlkhkr";
const gitRepo = "DEV-WORDS";
interface GitCommitListTypes {
  commit: {
    message: string;
    committer: {
      name: string;
      date: Date;
    };
  };
}

interface CommitInfoTypes {
  type: string;
}

const commitTypeList: Array<string> = [
  "[Modify]",
  "[Add]",
  "[Fix]",
  "[Feat]",
  "[Refactor]",
  "[Docs]",
  "[Test]",
  "[Style]",
  "[Chore]",
  "[Remove]",
  "[!BREAKING CHANGE]",
  "Merge branch",
  "Merge pull request",
];

const getCommitTitle = (msg: string) => {
  return msg.split("\n")[0];
};

const getCommitTypeColor = (type: string) => {
  let commitType = -1;
  for (let t = 0; t < commitTypeList.length; t++) {
    type.indexOf(commitTypeList[t]) != -1
      ? (() => {
          commitType = t;
          return;
        })()
      : void 0;
  }
  switch (commitType) {
    case 0: //Modify
      return "#1388be70";
    case 1: //Add
    case 3: //Feat
    case 11: //Merge branch
    case 12: //Merge pull request
      return "#66c1426f";
    case 2: //Fix
    case 4: //Refactor
    case 5: //Docs
      return "#c19e426f";
    case 6: //Test
    case 7: //Style
    case 8: //Chore
    case 9: //Remove
    case 10: //BREAKING CHANGE
      return "#c19e426f";
    default:
      return "#c2c8cf";
  }
  return "";
};

const CommitInfoStyled = styled.div<CommitInfoTypes>`
  width: 100%;
  padding: 16px 16px 16px 20px;
  background-color: #f6f7f8;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 8px;
    height: 100%;
    left: 0;
    background-color: ${(props) => getCommitTypeColor(props.type)};
  }
  & + & {
    margin-top: 16px;
  }
`;

const DevHistory: React.FC = () => {
  const [gitCommitList, setGitCommitList] = useState<GitCommitListTypes[]>([]);
  const getData = async () => {
    try {
      await axios
        .get(
          `https://api.github.com/repos/${gitOwner}/${gitRepo}/commits?&per_page=100`
        )
        .then((res) => {
          setGitCommitList(res.data);
        });
    } catch {
      console.log("오류");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {gitCommitList.map((data: GitCommitListTypes, index: number) => {
        return (
          <CommitInfoStyled key={index} type={data.commit.message}>
            <Typo fontSize="16px" fontWeight="bold" textAlign="left">
              {data.commit.committer.name}
            </Typo>
            <Typo textAlign="left" marginTop="8px">
              {getCommitTitle(data.commit.message)}
            </Typo>
          </CommitInfoStyled>
        );
      })}
    </div>
  );
};

export default DevHistory;
