import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent"
interface LabelType extends styledInterface {
  htmlFor?: string;
  mandatory?: boolean;
}

const LabelStyled = styled.label<LabelType>`
  display: inline-block;
  margin-bottom: 4px;
  line-height: 24px;
  vertical-align: middle;
  font-weight: var(--weight-medium);
  font-size: ${(props) => (props.fontSize || "14px")};
  &:before {
    content: "\\2022";
    color: ${(props) => (props.mandatory ? "var(--color-red)" : "inherit")};
    margin-right: 4px;
  }
  input[type="radio"] + &,
  input[type="checkbox"] + & {
    font-weight: var(--weight-regular);
    margin-left: 8px;
    margin-bottom: 0px;
    font-size: 14px;
    &:before {
      content: "";
    }
  }
`;

const LabelComponent: React.FC<LabelType> = ({
  htmlFor,
  desc,
  mandatory,
}) => {
  return (
    <LabelStyled htmlFor={htmlFor} mandatory={mandatory}>
      {desc}
    </LabelStyled>
  );
};

LabelComponent.defaultProps = {
  mandatory: false,
};

export default LabelComponent;
