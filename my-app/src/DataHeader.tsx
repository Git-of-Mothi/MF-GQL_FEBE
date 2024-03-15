import React from "react";

const DataHeader: React.FC<TitleProp> = ({ title }) => {
  return (
    <center>
      <h1 style={{ color: "antiquewhite" }}>{title}</h1>
    </center>
  );
};

export default DataHeader;

export interface TitleProp {
  title: string;
}
