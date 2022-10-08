import React from "react";

interface LegendTypes {
  desc: string
}

const Legend: React.FC<LegendTypes> = ({ desc }) => {

  return (
    <legend>{desc}</legend >
  );
};

Legend.defaultProps = {

}

export default Legend;
