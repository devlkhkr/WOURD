import React from "react";
import { MouseEventHandler } from "react";
import Link from "next/link";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
interface AnchorType extends styledInterface {
  children: React.ReactNode;
  href: string;
}

const AnchorStyled = styled.a<AnchorType>`
  width: ${(props) => props.width || "auto"};
  display: inline-block;
  color: unset;
  text-decoration: none;
`;

const AnchorComponent: React.FC<AnchorType> = ({ width, href, children }) => {
  return (
    <Link href={href}>
      <AnchorStyled href={href} width={width}>
        {children}
      </AnchorStyled>
    </Link>
  );
};

AnchorComponent.defaultProps = {};

export default AnchorComponent;
