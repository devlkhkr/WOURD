import { MouseEventHandler } from "react";
export default interface StyledComponentTypes {
  children?: React.ReactNode;
  display?: string;
  reference?: any;

  id?: string;
  name?: string;
  className?: string;
  desc?: string;

  width?: string;
  height?: string;

  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;

  paddingTop?: string;
  paddingRight?: string;
  paddingLeft?: string;
  paddingBottom?: string;

  backgroundColor?: string;
  color?: string;

  onClick?: MouseEventHandler;
  onPointerDown?: MouseEventHandler;
  title?: string;

  opacity?: string;
  pointerEvents?: string;

  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  textAlign?: string;

  zIndex?: number;
}
