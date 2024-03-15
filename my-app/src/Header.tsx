import React from "react";

const Header: React.FC<TitleProp> = ({ title }) => {
  return (
    <center>
      <h1 style={{ color: "antiquewhite" }}>{title}</h1>
    </center>
  );
};

export default Header;

export interface TitleProp {
  title: string;
}
