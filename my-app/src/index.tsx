import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import DataComponent from "./DataComponent";

ReactDOM.render(
  <ApolloProvider client={client}>
    <DataComponent />
  </ApolloProvider>,
  document.getElementById("root")
);
