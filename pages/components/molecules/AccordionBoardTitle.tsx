import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import TypoComponent from "../atoms/Typo";
import Icon from "../atoms/Icon";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface AccordionBoardTitleTypes extends styledInterface {
  titleText: string;
  date: string;
  afterIcon?: string;
}

const AccordionBoardTitleComponent = styled.div`
  cursor: pointer;
`;

const ArrowIconWrap = styled.div`
  position: absolute;
  top: 16px;
  right: 12px;
`;

const AccordionBoardTitle: React.FC<AccordionBoardTitleTypes> = ({
  titleText,
  date,
  afterIcon,
  onClick
}) => {
  const setAfterIcon = () => {
    switch (afterIcon) {
      case "arr-down":
        return (
          <Icon
            iconShape={faChevronDown}
            iconWidth="16px"
            iconHeight="16px"
            svgSize="12px"
          />
        );
      case "arr-up":
        return (
          <Icon
            iconShape={faChevronUp}
            iconWidth="16px"
            iconHeight="16px"
            svgSize="12px"
          />
        );
      default:
        return;
    }
  };

  return (
    <AccordionBoardTitleComponent onClick={onClick}>
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
      <ArrowIconWrap>{afterIcon && setAfterIcon()}</ArrowIconWrap>
    </AccordionBoardTitleComponent>
  );
};

export default AccordionBoardTitle;
