import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import ButtonCompontent from "../atoms/Button";
import Typo from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";

interface DataEmptyTypes extends styledInterface {
  title?: string;
  detail?: string;
  ppsTit?: string;
  ppsFunc?: MouseEventHandler;
  fullsize?: boolean;
}

const DataEmptyStyled = styled.div<DataEmptyTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100%;
  height: ${(props) => (props.fullsize ? "100%" : "auto")};
  padding: ${(props) => (props.fullsize ? "" : "24px 0")};
  position: ${(props) => (props.fullsize ? "absolute" : "static")};
  margin-top: ${(props) => (props.fullsize ? void 0 : "24px")}; ;
`;

const DataEmptyComponent: React.FC<DataEmptyTypes> = ({
  title,
  detail,
  ppsTit,
  ppsFunc,
  fullsize,
}) => {
  return (
    <DataEmptyStyled fullsize={fullsize}>
      <Typo fontSize="18px" fontWeight="bold" color="var(--color-deepgrey)">
        {title}
      </Typo>
      {detail ? (
        <Typo marginTop="16px" lineHeight="1.5" color="var(--color-grey)">
          <p dangerouslySetInnerHTML={{ __html: detail }}></p>
        </Typo>
      ) : (
        <></>
      )}
      {ppsTit && ppsFunc ? (
        <ButtonCompontent
          desc={ppsTit}
          onClick={ppsFunc}
          width="auto"
          height="40px"
          backgroundColor="var(--color-deepgrey)"
          marginTop="24px"
          color="#fff"
        ></ButtonCompontent>
      ) : (
        <></>
      )}
    </DataEmptyStyled>
  );
};

DataEmptyComponent.defaultProps = {};

export default DataEmptyComponent;
