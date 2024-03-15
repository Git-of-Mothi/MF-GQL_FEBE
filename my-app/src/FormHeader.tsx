import React from "react";

const FormHeader: React.FC<TitleProp> = ({ title }) => {
  return (
    <center>
      <h1 style={{ color: "antiquewhite" }}>{title}</h1>
    </center>
  );
};

export default FormHeader;

export interface TitleProp {
  title: string;
}
