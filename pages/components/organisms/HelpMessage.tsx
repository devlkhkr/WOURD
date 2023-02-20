import styledInterface from "../../../functional/intefaces/styledComponent";
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
      article: `https://wourd.com에 접속하여 웹 버전으로 이용하실 수 있습니다. <br>
        기본적으로 프로필을 만들고, 단어에 대한 상태를 방향으로 카드를 넘기면서 관리할 수 있는 무료 기능이 제공됩니다.`,
      isOpened: false,
    },
    {
      id: 1,
      title: "Wourd는 어떤 서비스인가요?",
      date: "2.15 Feb",
      article: `CS에서 사용되는 단어들을 카테고리별 / 상태별로 저장하여 관리할 수 있습니다. <br>
        다른 사용자가 등록한 단어들을 살펴보고 내가 생성한 단어를 공유하여 모두가 지식의 문을 <br>
        넓혀나가는 것이 서비스의 목표입니다.`,
      isOpened: false,
    },
    {
      id: 2,
      title: "알고 있는 단어를 등록할 수 있나요?",
      date: "2.20 Feb",
      article: `랜덤카드 -> 상단 우측에 + 마크를 통해 단어를 등록하여 다른 사용자들이 볼 수 있도록 등록할 수 있습니다.`,
      isOpened: false,
    },
    {
      id: 3,
      title: "서비스에 대해 궁금한 점이 있어요.",
      date: "2.20 Feb",
      article: `설정 -> 시스템스펙을 보시면 이 서비스를 구축한 개발자들의 깃헙 / 인스타그램 / 메일을 확인하실 수 있습니다. <br>
      인스타그램 혹은 메일로 문의주시면 답변드리겠습니다. `,
      isOpened: false,
    },
    {
      id: 4,
      title: "아이디, 비밀번호 분실 시에는 어떻게하나요?",
      date: "2.20 Feb",
      article: `아이디 / 비밀번호 분실 시 로그인 페이지의 '아이디 찾기' / '비밀번호 찾기' 를 클릭하여 이름과 가입 시 등록했던 이메일 주소를 입력해주세요. <br>
      이메일 주소가 기억나지 않거나 자동찾기 시 문제가 생기면 설정 -> 시스템스펙에 개발자들 연락처로 문의주시면 상담 도와드리겠습니다.`,
      isOpened: false,
    },
    {
      id: 5,
      title: "도네이션은 어디에 사용되나요?",
      date: "2.20 Feb",
      article: `도네이션은 매달 서버 사용료 및 서비스 개발에 이용되며 혹, 오버차지 된 금액은 기부업체 선정 후 연말에 전액 기부될 예정입니다.`,
      isOpened: false,
    },
    {
      id: 6,
      title: "상태를 변경한 단어는 어디서 볼 수 있나요?",
      date: "2.20 Feb",
      article: `좌측 하단에 단어장을 보시면 사용자가 상태별로 분류한 단어들이 있습니다. <br>
      필터링을 통해 상태별 / 카테고리별 / 등록자별 정렬이 가능하며 단어장에 등록되어있는 단어들은 검색이 가능합니다`,
      isOpened: false,
    },
    {
      id: 7,
      title: "프로필 아바타를 바꾸고 싶어요",
      date: "2.20 Feb",
      article: `설정에서 상단 프로필로 접근 후 랜덤한 아바타로 생성하시면 됩니다. <br>
      원하시는 디자인 또한 선택이 가능하며 랜덤한 아바타중 제일 마음에 드는 아바타를 선택해 주세요.`,
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
