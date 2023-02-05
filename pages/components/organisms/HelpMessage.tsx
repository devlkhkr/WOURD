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
      title: "당신이 알고싶은 무언가에 대한 제목",
      date: "11.1 NOV",
      article:
        "이것을 알고싶다면 조금만 기다려주세요. 곰방 우리가 여기다가 업데이트 해줄랑께 알겠져?",
      isOpened: false,
    },
    {
      id: 1,
      title: "미란이노래 좋다",
      date: "10.29 OCt",
      article:
        "미란이는 왜이렇게 매력이 있을까요? 비비랑 미란이랑 둘중에 누가 이쁜걸까 나는 비비에 한표를 주겠다",
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
        {helpAcrdData?.map((data, index) => {
          return <AccordionBoardList key={data.id} acrdData={data} />;
        })}
      </ul>
    </>
  );
};

export default HelpMessage;
