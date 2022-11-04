import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";

interface NoticeListArticleTypes {
  article: string;
  idx: number;
  activeArcd: any;
  active: any;
}

const NoticeListArticleComponent = styled.div`
  transition: all 0.3s ease;
  height: 0;
  overflow:hidden;
  &.active {
    overflow:unset;
    height: 50px;
  }
`;

const NoticeListArticle: React.FC<NoticeListArticleTypes> = ({
  article,
  idx,
  activeArcd,
  active,
}) => {
  return (
    <NoticeListArticleComponent className={`${active}`}>
      <TypoComponent
        fontSize="14px"
        fontWeight="regular"
        textAlign="left"
        lineClamp="2"
        marginTop="4px"
      >
        {article}
      </TypoComponent>
    </NoticeListArticleComponent>
  );
};

export default NoticeListArticle;
