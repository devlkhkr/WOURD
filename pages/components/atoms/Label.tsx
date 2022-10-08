import React from "react";
import styled from "styled-components";

interface LabelType {
  id?: string;
  htmlFor?: string;
  desc?: string;
  mandatory?: boolean;
}

const LabelStyled = styled.label<LabelType>`
  display: inline-block;
  margin-bottom: 8px;
  line-height: 24px;
  vertical-align: middle;
  font-weight: var(--weight-medium);
  &:before {
    content: "\\2022";
    color: ${(props) => (props.mandatory ? "var(--color-red)" : "inherit")};
    margin-right: 4px;
  }
  input[type="radio"] + & {
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
  id,
  htmlFor,
  desc,
  mandatory,
}) => {
  return (
    <LabelStyled id={id} htmlFor={htmlFor} mandatory={mandatory}>
      {desc}
    </LabelStyled>
  );
};

LabelComponent.defaultProps = {
  mandatory: false,
};

export default LabelComponent;
