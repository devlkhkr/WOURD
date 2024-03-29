import { useEffect, useState } from "react";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
import AccordionBoardArticle from "../molecules/AccordionBoardArticle";
import AccordionBoardTitle from "../molecules/AccordionBoardTitle";

import { acrdDataTypes, noticeListTypes } from "./Notice";

const AccordionBoardListComponent = styled.li`
  padding: 16px 16px 16px 12px;
  border-top: 1px dashed var(--color-lightgrey);
  position: relative;
  &:last-child {
    border-bottom: 1px dashed var(--color-lightgrey);
  }
`;

interface AccordionBoardListTypes extends styledInterface {
  acrdData: acrdDataTypes;
}

const AccordionBoardList: React.FC<AccordionBoardListTypes> = ({
  acrdData,
}) => {
  const [data, setData] = useState(acrdData);
  useEffect(() => {}, [data]);
  return data ? (
    <>
      <AccordionBoardListComponent>
        <AccordionBoardTitle
          titleText={data.title}
          date={data.date}
          isOpened={data.isOpened}
          afterIcon={data.isOpened ? "arr-up" : "arr-down"}
          onClick={() => {
            setData({ ...data, isOpened: !data.isOpened });
          }}
        ></AccordionBoardTitle>

        <AccordionBoardArticle
          isOpened={data.isOpened}
          article={data.article}
        ></AccordionBoardArticle>
      </AccordionBoardListComponent>
    </>
  ) : (
    <></>
  );
};

export default AccordionBoardList;
