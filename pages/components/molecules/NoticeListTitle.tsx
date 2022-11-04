import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";

import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";
interface NoticeListTitleTypes {
  titleText: string;
  date: string;
  idx: number;
  activeArcd: any;
  setActiveArcd: any;
  active: any;
}

const NoticeListTitleComponent = styled.div`
  cursor: pointer;
`;

const ArrowIconWrap = styled.div`
  position: absolute;
  top: 16px;
  right: 12px;
  transition: all 0.2s ease;
  transform: rotate(360deg);
  &.active {
    transform: rotate(180deg);
  }
`;

const NoticeListTitle: React.FC<NoticeListTitleTypes> = ({
  titleText,
  date,
  idx,
  setActiveArcd,
  active,
}) => {
  const handleActive = () => {
    setActiveArcd(idx);
  };

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
      <ArrowIconWrap className={`${active}`}>
        <Icon
          iconShape={faChevronDown}
          iconWidth="16px"
          iconHeight="16px"
          svgSize="12px"
        />
      </ArrowIconWrap>
    </NoticeListTitleComponent>
  );
};

export default NoticeListTitle;
