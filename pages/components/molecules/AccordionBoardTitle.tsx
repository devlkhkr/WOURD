import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
import TypoComponent from "../atoms/Typo";
import Icon from "../atoms/Icon";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface AccordionBoardTitleTypes extends styledInterface {
  titleText: string;
  date: string;
  afterIcon?: string;
  isOpened: boolean;
}

interface isOpenedProps {
  isOpened: boolean;
}

const AccordionBoardTitleComponent = styled.div`
  cursor: pointer;
`;

const ArrowIconWrap = styled.div<isOpenedProps>`
  position: absolute;
  top: 16px;
  right: 12px;
  transition: all 0.3s linear;
  transform: ${(props) => (props.isOpened ? "rotate(180deg)" : "rotate(0deg)")};
`;

const AccordionBoardTitle: React.FC<AccordionBoardTitleTypes> = ({
  titleText,
  date,
  afterIcon,
  onClick,
  isOpened,
}) => {
  return (
    <AccordionBoardTitleComponent onClick={onClick}>
      <TypoComponent
        fontSize="15px"
        fontWeight="semi-bold"
        textAlign="left"
        color="#202020"
      >
        {titleText}
      </TypoComponent>
      <TypoComponent
        fontSize="13px"
        fontWeight="medium"
        textAlign="left"
        color="#cccccc"
        marginTop="4px"
      >
        {date}
      </TypoComponent>
      {/* <ArrowIconWrap>{afterIcon && setAfterIcon()}</ArrowIconWrap> */}
      <ArrowIconWrap isOpened={isOpened}>
        <Icon
          iconShape={faChevronDown}
          iconWidth="16px"
          iconHeight="16px"
          svgSize="12px"
        />
      </ArrowIconWrap>
    </AccordionBoardTitleComponent>
  );
};

export default AccordionBoardTitle;
