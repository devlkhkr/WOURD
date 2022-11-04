import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";

interface NoticeListTitleTypes {
  titleText: string;
  date: string;
  idx: number;
  activeArcd: any;
  setActiveArcd: any;
}

const NoticeListTitleComponent = styled.div``;

const NoticeListTitle: React.FC<NoticeListTitleTypes> = ({ titleText, date, idx, activeArcd, setActiveArcd }) => {
  const handleActive = () => {
    setActiveArcd(idx);
  }
  
  return (
    <NoticeListTitleComponent onClick={handleActive}>
      <TypoComponent
        fontSize="16px"
        fontWeight="semi-bold"
        textAlign="left"
        color="#202020"
      >
        {titleText}
      </TypoComponent>
      <TypoComponent
        fontSize="14px"
        fontWeight="medium"
        textAlign="left"
        color="#cccccc"
        marginTop="4px"
      >
        {date}
      </TypoComponent>
    </NoticeListTitleComponent>
  );
};

export default NoticeListTitle;
