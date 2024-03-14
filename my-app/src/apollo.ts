import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3100/graphql",
  cache: new InMemoryCache(),
});

export { client };
