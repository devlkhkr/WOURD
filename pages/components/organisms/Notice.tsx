import { useState } from "react";
import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import NoticeListTitle from "../molecules/NoticeListTitle";
import NoticeListArticle from "../molecules/NoticeListArticle";

const NoticeListItem = styled.li`
  padding: 16px 16px 16px 12px;
  border-top: 1px solid #1388be70;
  position: relative;
  &:last-child {
    border-bottom: 1px solid #1388be70;
  }
`;

interface noticeListTypes {
  title: string;
  date: string;
  article: string;
}

const Notice: React.FC = () => {
  const [noticeLists, setNoticeLists] = useState<noticeListTypes[]>([
    {
      title: "이번에 진짜 많이 업데이트했어요",
      date: "11.1 NOV",
      article:
        "우리가 진짜 이번에 뭐했는지 아세욤? ㅠ 진짜 ! 이건 알아줘야한다구 ㅠ 개발히스토리보삼 ㅋ 일단은 2줄을 채워야하니까 이렇게 길게",
    },
    {
      title: "11월 말에 일본가지렁🔥",
      date: "10.29 OCt",
      article: "짧게 넣을것인가욤? 눌렀을때 또한번 어디론가 이동해야하나욤?",
    },
    {
      title: "이번에 진짜 많이 업데이트했어요",
      date: "11.1 NOV",
      article:
        "우리가 진짜 이번에 뭐했는지 아세욤? ㅠ 진짜 ! 이건 알아줘야한다구 ㅠ 개발히스토리보삼 ㅋ 일단은 2줄을 채워야하니까 이렇게 길게",
    },
    {
      title: "11월 말에 일본가지렁🔥",
      date: "10.29 OCt",
      article: "짧게 넣을것인가욤? 눌렀을때 또한번 어디론가 이동해야하나욤?",
    },
  ]);

  console.log(noticeLists)

  const [activeArcd, setActiveArcd] = useState();

  return (
    <ul>
      {noticeLists.map((list, idx) => {
        const active = idx === activeArcd ? "active" : "";
        // console.log(active)
        return (
          <NoticeListItem>
            <NoticeListTitle
              titleText={list.title}
              date={list.date}
              idx={idx}
              active={active}
              activeArcd={activeArcd}
              setActiveArcd={setActiveArcd}
            ></NoticeListTitle>
            <NoticeListArticle
              article={list.article}
              idx={idx}
              activeArcd={activeArcd}
              active={active}
            />
          </NoticeListItem>
        );
      })}
      {/* 화살표 아이콘 */}
    </ul>
  );
};

export default Notice;
