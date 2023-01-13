import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";

interface ArcodianBoardListTypes {
  article: string;
  isOpened: boolean;
}

const ArcodianBoardListComponent = styled.div<ArcodianBoardListTypes>`
  transition: all 0.3s linear;
  max-height: 0;
  overflow: hidden;
  max-height: ${props => (props.isOpened ? "60vw" : "0")};
`;

const ArcodianBoardList: React.FC<ArcodianBoardListTypes> = ({
  article,
  isOpened,
}) => {
  return (
    <ArcodianBoardListComponent isOpened={isOpened} article={article}>
      <TypoComponent
        fontSize="14px"
        fontWeight="regular"
        textAlign="left"
        marginTop="4px"
      >
        {article}
      </TypoComponent>
    </ArcodianBoardListComponent>
  );
};

export default ArcodianBoardList;
