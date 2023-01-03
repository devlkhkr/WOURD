import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface UsageComponent extends styledInterface {
  usageList: string[];
}

const UsageStyled = styled.ul<UsageComponent>`
  /* background-color: #ebf7ff; */
  background-color: #f4f7ff;
  padding: 16px 16px 16px 10px;
  li {
    padding-left: 12px;
    font-size: 12px;
    line-height: 1.25;
    position: relative;
    color: rgba(0, 0, 0, 0.5);
    word-break: keep-all;
    &::before {
      content: "\\2022";
      position: absolute;
      left: 0;
    }
    & + li {
      margin-top: 8px;
    }
  }
`;

const UsageComponent: React.FC<UsageComponent> = ({ usageList }) => {
  return (
    <UsageStyled usageList={usageList}>
      {usageList.map((notice: string, index: number) => (
        <li key={index}>{notice}</li>
      ))}
    </UsageStyled>
  );
};

UsageComponent.defaultProps = {};

export default UsageComponent;
