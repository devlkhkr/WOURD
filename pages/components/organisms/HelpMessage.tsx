import styledInterface from "../Intefaces/styledComponent";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { acrdDataTypes } from "./Notice";
import AccordionBoardList from "./AccordionBoardList";
import { useState } from "react";

interface helpMessageListTypes extends styledInterface {
  acrdTitle: string;
  acrdList: acrdDataTypes[];
}

const HelpMessage: React.FC = () => {
  const [helpAcrdData, setHelpAcrdData] = useState<acrdDataTypes[]>([
    {
      id: 0,
      title: "Wourd는 무료인가요?",
      date: "2.15 Feb",
      article:
        `https://wourd.com에 접속하여 웹 버전으로 이용하실 수 있습니다. <br>
        기본적으로 프로필을 만들고, 단어에 대한 상태를 방향으로 카드를 넘기면서 관리할 수 있는 무료 기능이 제공됩니다.`,
      isOpened: false,
    },
    {
      id: 1,
      title: "Wourd는 어떤 서비스인가요?",
      date: "2.15 Feb",
      article:
        `CS에서 사용되는 단어들을 카테고리별 / 상태별로 저장하여 관리할 수 있습니다. <br>
        다른 사용자가 등록한 단어들을 살펴보고 내가 생성한 단어를 공유하여 모두가 지식의 문을 <br>
        넓혀나가는 것이 서비스의 목표입니다.`,
      isOpened: false,
    },
  ]);
  const helpMessageAcrdList: helpMessageListTypes = {
    acrdTitle: "도움말(FAQ)",
    acrdList: helpAcrdData,
  };

  // const mapHelpMessageArcdList = [...helpMessageArcdList];
  return (
    <>
      <ul>
        {helpAcrdData?.reverse().map((data, index) => {
          return <AccordionBoardList key={data.id} acrdData={data} />;
        })}
      </ul>
    </>
  );
};

export default HelpMessage;
