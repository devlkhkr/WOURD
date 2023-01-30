import { useEffect, useState } from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import AccordionBoardArticle from "../molecules/AccordionBoardArticle";
import AccordionBoardTitle from "../molecules/AccordionBoardTitle";

import { acrdDataTypes, noticeListTypes } from "./Notice";

const AccordionBoardListComponent = styled.li`
  padding: 16px 16px 16px 12px;
  border-top: 1px solid #1388be70;
  position: relative;
  &:last-child {
    border-bottom: 1px solid #1388be70;
  }
`;

interface AccordionBoardListTypes extends styledInterface {
  acrdData: acrdDataTypes[];
  acrdFunc: any;
}

const AccordionBoardList: React.FC<AccordionBoardListTypes> = ({
  acrdData,
  acrdFunc
}) => {

  const [data, setData] = useState(acrdData);
  useEffect(() => {
    acrdFunc(data)
  }, [data])
  return (
    <>
      {data.map((list, index) => {
        return (
          <AccordionBoardListComponent key={index}>
            <AccordionBoardTitle
              titleText={list.title}
              date={list.date}
              afterIcon={list.isOpened ? "arr-up" : "arr-down"}
              onClick={() => {
                // const hello = data[index].isOpened = !data[index].isOpened
                // console.log(hello)
                setData([
                  {
                    title: "🔥",
                    date: "10.29 OCt",
                    article: "짧게 넣을것인가욤? 눌렀을때 또한번 어디론가 이동해야하나욤?",
                    isOpened: true,
                  },
                ])
              }}
            ></AccordionBoardTitle>

            {/* <AccordionBoardArticle
              isOpened={data[index].isOpened}
              article={list.article}
            ></AccordionBoardArticle> */}
          </AccordionBoardListComponent>
        );
      })}
    </>
  );
};

export default AccordionBoardList;
