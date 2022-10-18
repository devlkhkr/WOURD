import React from "react";
import styled from "styled-components";

interface TypoType {
  size?: string;
  weight?: string;
  align?: string;
  className?: string;
  children?: any;
}

const TypoStyled = styled.div<TypoType>`
    line-height: 1.2;
    font-weight: ${(props) => `var(--weight-${props.weight})`};
    font-size: ${(props) => props.size || "16px"};
    text-align: ${(props) => props.align || "center"};
  }
`;

const TypoComponent: React.FC<TypoType> = ({
  size,
  weight,
  align,
  children,
  className,
}) => {
  return (
    <TypoStyled size={size} weight={weight} align={align} className={className}>
      {children}
    </TypoStyled>
  );
};

TypoComponent.defaultProps = {};

export default TypoComponent;
