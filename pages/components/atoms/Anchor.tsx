import React from "react";
import { MouseEventHandler } from "react";
import Link from "next/link";
import styled from "styled-components";
import styledInterface from "../../../functional/intefaces/styledComponent";
interface AnchorType extends styledInterface {
  children: React.ReactNode;
  href: string;
  underline?: boolean;
}

const AnchorStyled = styled.a<AnchorType>`
  width: ${(props) => props.width || "auto"};
  display: inline-block;
  color: unset;
  text-decoration: none;
  ${(props) =>
    props.underline
      ? `
  &::before{
    content: "";
    display: inline-block;
    width: 100%;
    height: 100%;
    border-bottom: 1px dashed var(--color-lightgrey);
    position: absolute;
    bottom: -4px;
    left: 0;
  }`
      : ""};
`;

const AnchorComponent: React.FC<AnchorType> = ({
  width,
  href,
  children,
  underline,
}) => {
  return (
    <Link href={href ?? ""}>
      <AnchorStyled href={href ?? ""} width={width} underline={underline}>
        {children}
      </AnchorStyled>
    </Link>
  );
};

AnchorComponent.defaultProps = {};

export default AnchorComponent;
