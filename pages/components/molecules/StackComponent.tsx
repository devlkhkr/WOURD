import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";

interface StackComponentType extends styledInterface {
  name: string;
  src: string;
  by: string;
  docs: string;
  decs: string;
}


const StackItem = styled.li`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 16px;
`;

const StackComponent: React.FC<StackComponentType> = ({
  name, src, by, docs, decs
}) => {
  return (
    <StackItem>
      
    </StackItem>
  );
};

StackComponent.defaultProps = {};

export default StackComponent;
