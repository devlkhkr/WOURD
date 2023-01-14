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
  title: string;
  date: string;
  article: string;
  isOpened: boolean;
}
export interface noticeListTypes extends styledInterface {
  acrdTitle: string;
  // toggleFlag: boolean;
  // toggleFunc: Function;
  acrdList: acrdDataTypes[];
}

const Notice: React.FC = () => {
  const noticeAcrdList: noticeListTypes = {
    acrdTitle: "공지사항",
    acrdList: [
      {
        title: "이번에 진짜 많이 업데이트했어요",
        date: "11.1 NOV",
        article:
          "우리가 진짜 이번에 뭐했는지 아세욤? ㅠ 진짜 ! 이건 알아줘야한다구 ㅠ 개발히스토리보삼 ㅋ 일단은 2줄을 채워야하니까 이렇게 길게",
        isOpened: false,
      },
      {
        title: "11월 말에 일본가지렁🔥",
        date: "10.29 OCt",
        article: "짧게 넣을것인가욤? 눌렀을때 또한번 어디론가 이동해야하나욤?",
        isOpened: false,
      },
      {
        title: "이번에 진짜 많이 업데이트했어요",
        date: "11.1 NOV",
        article:
          "우리가 진짜 이번에 뭐했는지 아세욤? ㅠ 진짜 ! 이건 알아줘야한다구 ㅠ 개발히스토리보삼 ㅋ 일단은 2줄을 채워야하니까 이렇게 길게",
        isOpened: false,
      },
      {
        title: "11월 말에 일본가지렁🔥",
        date: "10.29 OCt",
        article: "짧게 넣을것인가욤? 눌렀을때 또한번 어디론가 이동해야하나욤?",
        isOpened: false,
      },
    ],
  };

  // const mapNoticeArcdList = [...noticeArcdList];
  return (
    <>
      {/* {mapNoticeArcdList.map((noticeAcrd, index) => ( */}
      <ul>
        {/* {noticeAcrd.acrdList.map((list, index) => ( */}
        <AccordionBoardList acrdData={noticeAcrdList.acrdList} />
        {/* ))} */}
      </ul>
      {/* ))} */}
    </>
  );
};

export default Notice;
