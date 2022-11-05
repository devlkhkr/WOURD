import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";

interface NoticeListArticleTypes {
  article: string;
  isOpened: boolean;
}

const NoticeListArticleComponent = styled.div<NoticeListArticleTypes>`
  transition: all 0.3s linear;
  max-height: 0;
  overflow: hidden;
  max-height: ${props => (props.isOpened ? "60vw" : "0")};
`;

const NoticeListArticle: React.FC<NoticeListArticleTypes> = ({
  article,
  isOpened,
}) => {
  return (
    <NoticeListArticleComponent isOpened={isOpened} article={article}>
      <TypoComponent
        fontSize="14px"
        fontWeight="regular"
        textAlign="left"
        marginTop="4px"
      >
        {article}
      </TypoComponent>
    </NoticeListArticleComponent>
  );
};

export default NoticeListArticle;
