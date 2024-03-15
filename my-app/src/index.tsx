import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import DataComponent from "./DataComponent";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <DataComponent />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
