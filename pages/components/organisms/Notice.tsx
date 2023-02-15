import { useState } from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import AccordionBoardList from "./AccordionBoardList";

const NoticeListItem = styled.li`
  padding: 16px 16px 16px 12px;
  border-top: 1px solid #1388be70;
  position: relative;
  &:last-child {
    border-bottom: 1px solid #1388be70;
  }
`;

export interface acrdDataTypes {
  id: number;
  title: string;
  date: string;
  article: any;
  isOpened: boolean;
}
export interface noticeListTypes extends styledInterface {
  acrdTitle: string;
  acrdList: acrdDataTypes[];
}

const Notice: React.FC = () => {
  const [noticeAcrdData, setnNoticeAcrdData] = useState<acrdDataTypes[]>([
    {
      id: 0,
      title: "Wourd 서비스 이용 안내",
      date: "2.15 Feb",
      article: `Wourd 서비스는 CS에서 사용되는 단어들을 카테고리 별로 등록하여 저장 및 상태를 관리할 수 있습니다. <br />
      다른 사용자가 등록한 단어들을 살펴보고 내가 생성한 단어를 공유하여 모두가 지식의 문을 넓혀가는 것이 서비스의 목표입니다.`,
      isOpened: false,
    },
    {
      id: 1,
      title: "1.0.0 버전 업데이트 노트",
      date: "2.15 Feb",
      article:
        `1.0.0 버전에서는 기본 서비스의 사용이 가능합니다. <br />
        단어들을 아는 단어 / 모르는 단어 / 즐겨찾는 단어 / 건너 뛴 단어 <br />
        4가지의 상태로 관리할 수 있으며, 내가 아는 단어를 공유할 수 있는 등록 기능도 활성화 되었습니다.`,
      isOpened: false,
    },
  ]);

  const noticeAcrdList: noticeListTypes = {
    acrdTitle: "공지사항",
    acrdList: noticeAcrdData,
  };

  return (
    <>
      <ul>
        {noticeAcrdData?.reverse().map((data, index) => {
          return <AccordionBoardList key={data.id} acrdData={data} />;
        })}
      </ul>
    </>
  );
};

export default Notice;
