import { useState } from "react";
import styled from "styled-components";
import TypoComponent from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import HelpmessageListTitle from "../molecules/HelpMessageListTitle";
import HelpMessageListArticle from "../molecules/HelpMessageListArticle";


const HelpMessageListItem = styled.li`
  padding: 16px 16px 16px 12px;
  border-top: 1px solid #1388be70;
  position: relative;
  &:last-child {
    border-bottom: 1px solid #1388be70;
  }
`;

interface helpMessageListTypes extends styledInterface {
  acrdTitle: string;
  acrdList: {
    title: string;
    date: string;
    article: string;
    isOpened: boolean;
  }[];
}

const HelpMessage: React.FC = () => {
  const [helpMessageArcdList, setHelpMessageArcdList] = useState<helpMessageListTypes[]>([
    {
      acrdTitle: "도움말(FAQ)",
      acrdList: [
        {
          title: "당신이 알고싶은 무언가에 대한 제목",
          date: "11.1 NOV",
          article:
            "이것을 알고싶다면 조금만 기다려주세요. 곰방 우리가 여기다가 업데이트 해줄랑께 알겠져?",
          isOpened: false,
        },
        {
          title: "미란이노래 좋다",
          date: "10.29 OCt",
          article:
            "미란이는 왜이렇게 매력이 있을까요? 비비랑 미란이랑 둘중에 누가 이쁜걸까 나는 비비에 한표를 주겠다",
          isOpened: false,
        },
      ],
    },
  ]);

  const mapHelpMessageArcdList = [...helpMessageArcdList];
  return (
    <>
      {mapHelpMessageArcdList.map((helpMessageAcrd, index) => (
        <ul key={index}>
          {helpMessageAcrd.acrdList.map((list, index) => (
            <HelpMessageListItem key={index}>
              <HelpmessageListTitle
                titleText={list.title}
                date={list.date}
                afterIcon={list.isOpened ? "arr-up" : "arr-down"}
                onClick={() => {
                  list.isOpened = !list.isOpened
                  setHelpMessageArcdList(mapHelpMessageArcdList)
                }}
              ></HelpmessageListTitle>

              <HelpMessageListArticle
                isOpened={list.isOpened}
                article={list.article}
              ></HelpMessageListArticle>
            </HelpMessageListItem>
          ))}
        </ul>
      ))}
    </>
  );
};

export default HelpMessage;
