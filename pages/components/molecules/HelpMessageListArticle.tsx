import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";

interface HelpMessageListArticleTypes {
  article: string;
  isOpened: boolean;
}

const HelpMessageListArticleComponent = styled.div<NoticeListArticleTypes>`
  transition: all 0.3s linear;
  max-height: 0;
  overflow: hidden;
  max-height: ${props => (props.isOpened ? "60vw" : "0")};
`;

const HelpMessageListArticle: React.FC<HelpMessageListArticleTypes> = ({
  article,
  isOpened,
}) => {
  return (
    <HelpMessageListArticleComponent isOpened={isOpened} article={article}>
      <TypoComponent
        fontSize="14px"
        fontWeight="regular"
        textAlign="left"
        marginTop="4px"
      >
        {article}
      </TypoComponent>
    </HelpMessageListArticleComponent>
  );
};

export default HelpMessageListArticle;
