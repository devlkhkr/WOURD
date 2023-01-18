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
}

const AccordionBoardList: React.FC<AccordionBoardListTypes> = ({
  acrdData,
}) => {
  console.log(acrdData);
  return (
    <>
      {acrdData.map((list, index) => {
        console.log(list.isOpened)
        return (
          <AccordionBoardListComponent key={index}>
            <AccordionBoardTitle
              titleText={list.title}
              date={list.date}
              afterIcon={list.isOpened ? "arr-up" : "arr-down"}
              onClick={() => {
                list.isOpened = !list.isOpened;
              }}
            ></AccordionBoardTitle>

            <AccordionBoardArticle
              isOpened={list.isOpened}
              article={list.article}
            ></AccordionBoardArticle>
          </AccordionBoardListComponent>
        );
      })}
    </>
  );
};

export default AccordionBoardList;
