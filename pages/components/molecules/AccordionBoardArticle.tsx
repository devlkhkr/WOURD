import { useEffect } from "react";
import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";

interface AccordionBoardArticleTypes {
  article: string;
  isOpened: boolean;
}

const AccordionBoardArticleComponent = styled.div<AccordionBoardArticleTypes>`
  transition: ${(props) =>
    props.isOpened ? "all 0.3s linear" : "all 0.15s linear"};
  max-height: 0;
  overflow: hidden;
  max-height: ${(props) => (props.isOpened ? "60vw" : "0")};
`;

interface ArticleProps {
  article: any;
}
const NoticeArticle = styled.p<ArticleProps>`
  font-size: 14px;
  font-weight: var(--weight-regular);
  line-height: 1.2;
  color: inherit;
  text-align: left;
  margin-top: 6px;
  margin-bottom: unset;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
`;

const AccordionBoardArticle: React.FC<AccordionBoardArticleTypes> = ({
  article,
  isOpened,
}) => {
  return (
    <AccordionBoardArticleComponent isOpened={isOpened} article={article}>
      {/* <TypoComponent
        fontSize="14px"
        fontWeight="regular"
        textAlign="left"
        marginTop="4px"
      >
        {article}
      </TypoComponent> */}
      <NoticeArticle
        article={article}
        dangerouslySetInnerHTML={{ __html: article }}
      ></NoticeArticle>
    </AccordionBoardArticleComponent>
  );
};

export default AccordionBoardArticle;
