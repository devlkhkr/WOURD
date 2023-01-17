import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import React from "react";
import styled from "styled-components";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";

export interface MyWordsListTypes {
  [key: string]: string | number | Date | boolean;
  user_id: string;
  user_word_key: string;
  word_id: string;
  word_desc: string;
  word_name: string;
  word_reg_userid: string;
  word_unravel: string;
  word_state: string;
  user_prf_img: string;
  user_nickname: string;
  word_is_cs_flag: number;
  word_is_web_flag: number;
  word_is_ntv_flag: number;
  state_modified_date: Date;
  active_state_flag: boolean;
  active_cate_flag: boolean;
}

interface MyWordCardTypes {
  objMyWord: MyWordsListTypes;
  onCardClick: Function;
  contextOnclick: Function;
  searchKeyword?: string;
}

const MyWordListWrapStyled = styled.div`
  width: 100%;
  /* height: 136px; */
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.05);
  &[class*="state"] {
    &:first-child {
      margin-top: 0;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      right: 0;
      top: 0;
    }
    &::after {
      border-width: 0 20px 20px 0;
      border-color: transparent #f6f7f8 transparent transparent;
    }
    &::before {
      border-width: 20px 0 0 20px;
      border-color: transparent transparent transparent red;
    }
  }
  &.state {
    &_k::before {
      border-color: transparent transparent transparent #94be88;
    }
    &_d::before {
      border-color: transparent transparent transparent #da8484;
    }
    &_f::before {
      border-color: transparent transparent transparent #c8be51;
    }
    &_s::before {
      border-color: transparent transparent transparent #bb88be;
    }
  }
`;

const MyWordCateListStyled = styled.div`
  span {
    & + span {
      &::before {
        content: "";
        display: inline-block;
        width: 1px;
        height: 9px;
        background-color: var(--color-grey);
        margin: 0 8px;
        opacity: 0.35;
        vertical-align: middle;
      }
    }
  }
  img {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-color: #f6f7f8;
  }
`;

const WordEditWrapStyeld = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  i {
    display: inline-block;
    & + i {
      margin-left: 12px;
    }
  }
`;

const MyWordCardComponent: React.FC<MyWordCardTypes> = ({
  objMyWord,
  onCardClick,
  contextOnclick,
  searchKeyword,
}) => {
  const userData: any = useSession().data?.user;
  const setTitleMark = (title: string, keyword: string) => {
    let markIdx = title.toUpperCase().indexOf(keyword.toUpperCase());
    let markdownStr =
      title.substr(0, markIdx) +
      `<mark>${title.substr(markIdx, keyword.length)}</mark>` +
      title.substr(markIdx + keyword.length, title.length);

    return markdownStr;
  };
  return objMyWord.active_state_flag && objMyWord.active_cate_flag ? (
    <MyWordListWrapStyled
      className={`state_${objMyWord.word_state}`}
      onClick={() => onCardClick(objMyWord)}
    >
      <Typo lineClamp="1" fontSize="16px" fontWeight="bold" textAlign="left">
        <p
          dangerouslySetInnerHTML={{
            __html: searchKeyword
              ? setTitleMark(objMyWord.word_name, searchKeyword)
              : objMyWord.word_name,
          }}
        ></p>
      </Typo>
      {objMyWord.word_unravel ? (
        <Typo
          lineClamp="1"
          textAlign="left"
          marginTop="4px"
          color="var(--color-grey)"
        >
          {objMyWord.word_unravel}
        </Typo>
      ) : (
        <></>
      )}
      <Typo
        lineClamp={objMyWord.word_unravel == null ? "3" : "2"}
        textAlign="left"
        marginTop="10px"
      >
        {objMyWord.word_desc}
      </Typo>
      <MyWordCateListStyled>
        <Typo
          fontSize="12px"
          color="var(--color-grey)"
          marginTop="12px"
          textAlign="left"
        >
          {objMyWord.word_is_cs_flag ? <span>CS</span> : <></>}
          {objMyWord.word_is_web_flag ? <span>Web</span> : <></>}
          {objMyWord.word_is_ntv_flag ? <span>Native</span> : <></>}
        </Typo>
        <WordEditWrapStyeld>
          {objMyWord.user_id === userData.email ? (
            <>
              <Icon
                iconShape={faEllipsis}
                iconWidth="14px"
                iconHeight="14px"
                align="auto"
                color="#acb8cf"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  contextOnclick(event);
                }}
              />
            </>
          ) : (
            <img src={objMyWord.user_prf_img} />
          )}
        </WordEditWrapStyeld>
      </MyWordCateListStyled>
    </MyWordListWrapStyled>
  ) : (
    <></>
  );
};

MyWordCardComponent.defaultProps = {};

export default MyWordCardComponent;
